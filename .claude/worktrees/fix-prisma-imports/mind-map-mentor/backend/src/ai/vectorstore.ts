// Pinecone vector store operations. Mirrors app/ai/vectorstore.py.
// Keeps the same vector IDs (`note_{id}_content` / `note_{id}_summary`),
// the same `text` key, and the same metadata filter keys so the existing
// Pinecone index remains fully compatible.
import { Pinecone } from '@pinecone-database/pinecone';
import { Document } from '@langchain/core/documents';
import { PineconeStore } from '@langchain/pinecone';

import { settings } from '../config';
import { getEmbeddingFunction } from './embeddings';

export interface SimilarNote {
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
  const embeddings = getEmbeddingFunction();

  vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,
    textKey: 'text',
  });
  return vectorStore;
}

/** Upsert content and (optionally) summary vectors for a note. */
export async function upsertDocument(
  noteId: number,
  textContent: string,
  metadata: Record<string, unknown>,
  summaryText?: string | null,
): Promise<void> {
  try {
    const store = await getVectorStore();

    const contentDocId = `note_${noteId}_content`;
    const contentDoc = new Document({
      pageContent: textContent,
      metadata: { ...metadata, embedding_type: 'content' },
    });
    await store.addDocuments([contentDoc], { ids: [contentDocId] });

    if (summaryText && summaryText.trim()) {
      const summaryDocId = `note_${noteId}_summary`;
      const summaryDoc = new Document({
        pageContent: summaryText,
        metadata: { ...metadata, embedding_type: 'summary' },
      });
      await store.addDocuments([summaryDoc], { ids: [summaryDocId] });
    }
  } catch (err) {
    console.error(`Failed during vector upsert for Note ID ${noteId}:`, err);
  }
}

/** Best-effort deletion of both content and summary vectors for a note. */
export async function deleteDocument(noteId: number): Promise<void> {
  const ids = [`note_${noteId}_content`, `note_${noteId}_summary`];
  try {
    const store = await getVectorStore();
    await store.delete({ ids });
  } catch (err) {
    console.error(`Failed during vector deletion for Note ID ${noteId}:`, err);
  }
}

/** Similarity search filtered by user_id and embedding_type. */
export async function querySimilarNotes(params: {
  queryText: string;
  userId: number;
  embeddingTypeFilter: string;
  topK?: number;
  filter?: Record<string, unknown>;
}): Promise<SimilarNote[]> {
  const { queryText, userId, embeddingTypeFilter, topK = 5, filter } = params;
  const finalFilter: Record<string, unknown> = {
    user_id: userId,
    embedding_type: embeddingTypeFilter,
    ...(filter ?? {}),
  };

  try {
    const store = await getVectorStore();
    const results = await store.similaritySearchWithScore(queryText, topK, finalFilter);

    const out: SimilarNote[] = [];
    for (const [doc, score] of results) {
      const metadata = (doc.metadata ?? {}) as Record<string, unknown>;

      const noteIdRaw = metadata.note_id;
      const noteId = noteIdRaw != null ? Math.trunc(Number(noteIdRaw)) : null;
      if (noteId != null) metadata.note_id = noteId;

      const userIdRaw = metadata.user_id;
      if (userIdRaw != null) metadata.user_id = Math.trunc(Number(userIdRaw));

      if (noteId != null) {
        out.push({
          id: `note_${noteId}`,
          score,
          metadata,
          page_content: doc.pageContent,
        });
      }
    }
    return out;
  } catch (err) {
    console.error('Error querying Pinecone for similar notes:', err);
    return [];
  }
}
