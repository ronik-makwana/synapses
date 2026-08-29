// Pinecone vector store operations. Mirrors app/ai/vectorstore.py.
//
// Vector IDs are deterministic so re-indexing overwrites in place:
//   note_{id}_content_{n}   one per content chunk
//   note_{id}_summary       single vector over the user summary
//   file_{id}_content_{n}   one per chunk of an uploaded file's text
// The pre-chunking IDs (`note_{id}_content`, no suffix) are still deleted on
// re-index so existing indexes do not keep stale vectors alongside the new ones.
import { Pinecone } from '@pinecone-database/pinecone';
import { Document } from '@langchain/core/documents';
import { PineconeStore } from '@langchain/pinecone';

import { settings } from '../config';
import { withRetry } from '../core/retry';
import { chunkText, MAX_CHUNKS_PER_DOCUMENT } from './chunking';
import { getDocumentEmbeddingFunction, getQueryEmbeddingFunction } from './embeddings';

/** A single retrieved chunk. `id` identifies the source note/file, not the chunk. */
export interface VectorMatch {
  id: string;
  score: number;
  metadata: Record<string, unknown>;
  page_content: string;
}

let vectorStore: PineconeStore | null = null;

async function getVectorStore(): Promise<PineconeStore> {
  if (vectorStore) return vectorStore;

  const pc = new Pinecone({ apiKey: settings.PINECONE_API_KEY });

  const indexName = settings.PINECONE_INDEX_NAME;
  const existing = await pc.listIndexes();
  const names = (existing.indexes ?? []).map((i) => i.name);
  if (!names.includes(indexName)) {
    throw new Error(`Pinecone index '${indexName}' not found.`);
  }

  const pineconeIndex = pc.index(indexName);

  vectorStore = await PineconeStore.fromExistingIndex(getDocumentEmbeddingFunction(), {
    pineconeIndex,
    textKey: 'text',
  });
  return vectorStore;
}

/**
 * Chunk IDs a document could occupy, from `from` up to the cap.
 * `from = 0` yields every ID the document could ever have used.
 */
function chunkIdRange(prefix: string, from = 0): string[] {
  const ids: string[] = [];
  for (let i = from; i < MAX_CHUNKS_PER_DOCUMENT; i += 1) {
    ids.push(`${prefix}_${i}`);
  }
  return ids;
}

/**
 * Replace all chunk vectors for one document.
 *
 * New chunks are written first (deterministic IDs make that an overwrite), then
 * the tail left over from a longer previous version is deleted. Doing it in that
 * order means a failed re-index leaves the previous vectors in place rather than
 * making the document disappear from search entirely.
 */
async function replaceChunks(
  prefix: string,
  text: string,
  metadata: Record<string, unknown>,
  embeddingType: string,
): Promise<number> {
  const store = await getVectorStore();
  const chunks = chunkText(text);

  if (chunks.length === 0) {
    // Content was cleared — remove everything, including the pre-chunking ID.
    await withRetry(() => store.delete({ ids: [prefix, ...chunkIdRange(prefix)] }), {
      label: `delete chunks ${prefix}`,
    });
    return 0;
  }

  const documents = chunks.map(
    (chunk, index) =>
      new Document({
        pageContent: chunk,
        metadata: {
          ...metadata,
          embedding_type: embeddingType,
          chunk_index: index,
          chunk_count: chunks.length,
        },
      }),
  );
  const ids = chunks.map((_, index) => `${prefix}_${index}`);

  await withRetry(() => store.addDocuments(documents, { ids }), {
    label: `upsert chunks ${prefix}`,
  });

  // Drop the tail of a previously longer version, plus the unsuffixed ID written
  // before chunking existed, so no stale vector outlives the content it came from.
  await withRetry(() => store.delete({ ids: [prefix, ...chunkIdRange(prefix, chunks.length)] }), {
    label: `prune stale chunks ${prefix}`,
  });

  return chunks.length;
}

/**
 * Upsert content chunks and (optionally) the summary vector for a note.
 * Throws on failure — callers decide whether to retry or log, because a note
 * that silently fails to index is invisible to search and RAG forever.
 */
export async function upsertDocument(
  noteId: number,
  textContent: string,
  metadata: Record<string, unknown>,
  summaryText?: string | null,
): Promise<void> {
  const chunkCount = await replaceChunks(
    `note_${noteId}_content`,
    textContent,
    metadata,
    'content',
  );

  const summaryId = `note_${noteId}_summary`;
  const store = await getVectorStore();

  if (summaryText && summaryText.trim()) {
    // The summary is capped at 300 chars by the schema, so it is never chunked.
    const summaryDoc = new Document({
      pageContent: summaryText,
      metadata: { ...metadata, embedding_type: 'summary' },
    });
    await withRetry(() => store.addDocuments([summaryDoc], { ids: [summaryId] }), {
      label: `upsert summary ${summaryId}`,
    });
  } else {
    // The summary was cleared — drop any vector left from a previous version.
    await withRetry(() => store.delete({ ids: [summaryId] }), {
      label: `delete summary ${summaryId}`,
    });
  }

  console.info(`[vectorstore] Indexed note ${noteId}: ${chunkCount} content chunk(s).`);
}

/** Delete every vector belonging to a note. Throws on failure. */
export async function deleteDocument(noteId: number): Promise<void> {
  const store = await getVectorStore();
  const prefix = `note_${noteId}_content`;
  const ids = [prefix, ...chunkIdRange(prefix), `note_${noteId}_summary`];
  await withRetry(() => store.delete({ ids }), { label: `delete note ${noteId}` });
}

/** Upsert content chunks for an uploaded file's extracted text. Throws on failure. */
export async function upsertFileDocument(
  fileId: number,
  textContent: string,
  metadata: Record<string, unknown>,
): Promise<number> {
  const chunkCount = await replaceChunks(
    `file_${fileId}_content`,
    textContent,
    metadata,
    'content',
  );
  console.info(`[vectorstore] Indexed file ${fileId}: ${chunkCount} content chunk(s).`);
  return chunkCount;
}

/** Delete every vector belonging to a file. Throws on failure. */
export async function deleteFileDocument(fileId: number): Promise<void> {
  const store = await getVectorStore();
  const prefix = `file_${fileId}_content`;
  await withRetry(() => store.delete({ ids: [prefix, ...chunkIdRange(prefix)] }), {
    label: `delete file ${fileId}`,
  });
}

export interface QuerySimilarParams {
  queryText: string;
  userId: number;
  embeddingTypeFilter: string;
  topK?: number;
  /** Drop matches scoring below this. Retrieval returns the nearest vectors
   *  whether or not they are relevant, so an unfiltered result set will happily
   *  feed unrelated notes into a prompt. */
  minScore?: number;
  filter?: Record<string, unknown>;
}

/**
 * Similarity search scoped to one user and one embedding type.
 * Throws on failure — an outage must not be reported as "no results".
 */
export async function querySimilarNotes(params: QuerySimilarParams): Promise<VectorMatch[]> {
  const { queryText, userId, embeddingTypeFilter, topK = 5, minScore, filter } = params;

  const finalFilter: Record<string, unknown> = {
    user_id: userId,
    embedding_type: embeddingTypeFilter,
    ...(filter ?? {}),
  };

  const store = await getVectorStore();

  // Queries are embedded with RETRIEVAL_QUERY while the store indexes with
  // RETRIEVAL_DOCUMENT, so embed here rather than going through the store's
  // own (document-typed) embedder.
  const queryVector = await withRetry(() => getQueryEmbeddingFunction().embedQuery(queryText), {
    label: 'embed query',
  });
  const results = await withRetry(
    () => store.similaritySearchVectorWithScore(queryVector, topK, finalFilter),
    { label: 'similarity search' },
  );

  const matches: VectorMatch[] = [];
  for (const [doc, score] of results) {
    if (minScore != null && score < minScore) continue;

    const metadata = (doc.metadata ?? {}) as Record<string, unknown>;

    const noteId = metadata.note_id != null ? Math.trunc(Number(metadata.note_id)) : null;
    if (noteId != null) metadata.note_id = noteId;

    const fileId = metadata.file_id != null ? Math.trunc(Number(metadata.file_id)) : null;
    if (fileId != null) metadata.file_id = fileId;

    if (metadata.user_id != null) metadata.user_id = Math.trunc(Number(metadata.user_id));

    const sourceId = noteId != null ? `note_${noteId}` : fileId != null ? `file_${fileId}` : null;
    if (sourceId == null) continue;

    matches.push({ id: sourceId, score, metadata, page_content: doc.pageContent });
  }
  return matches;
}

/**
 * Collapse chunk-level matches to one entry per source document, keeping the
 * best-scoring chunk. Without this, one long note can occupy every result slot.
 */
export function dedupeBySource(matches: VectorMatch[]): VectorMatch[] {
  const best = new Map<string, VectorMatch>();
  for (const match of matches) {
    const existing = best.get(match.id);
    if (!existing || match.score > existing.score) best.set(match.id, match);
  }
  return [...best.values()].sort((a, b) => b.score - a.score);
}
