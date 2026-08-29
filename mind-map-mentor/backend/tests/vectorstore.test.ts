import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Document } from '@langchain/core/documents';

// Fake Pinecone: no network, but records exactly what the store was asked to do.
const addDocuments = vi.fn(async () => {});
const deleteVectors = vi.fn(async () => {});
const similaritySearchVectorWithScore = vi.fn(
  async (
    _query: number[],
    _k: number,
    _filter?: Record<string, unknown>,
  ): Promise<[Document, number][]> => [],
);

vi.mock('@pinecone-database/pinecone', () => ({
  Pinecone: class {
    async listIndexes() {
      return { indexes: [{ name: 'test-index' }] };
    }
    index() {
      return {};
    }
  },
}));

vi.mock('@langchain/pinecone', () => ({
  PineconeStore: {
    fromExistingIndex: async () => ({
      addDocuments,
      delete: deleteVectors,
      similaritySearchVectorWithScore,
    }),
  },
}));

vi.mock('../src/ai/embeddings', () => ({
  getDocumentEmbeddingFunction: () => ({ embedDocuments: async () => [], embedQuery: async () => [] }),
  getQueryEmbeddingFunction: () => ({ embedQuery: async () => [0.1, 0.2, 0.3] }),
}));

import {
  upsertDocument,
  deleteDocument,
  upsertFileDocument,
  querySimilarNotes,
  dedupeBySource,
  type VectorMatch,
} from '../src/ai/vectorstore';
import { MAX_CHUNKS_PER_DOCUMENT } from '../src/ai/chunking';

beforeEach(() => {
  addDocuments.mockClear();
  deleteVectors.mockClear();
  similaritySearchVectorWithScore.mockClear();
});

describe('upsertDocument', () => {
  it('writes one vector per chunk with deterministic ids', async () => {
    const longContent = 'A paragraph about knowledge graphs.\n\n'.repeat(200);
    await upsertDocument(7, longContent, { note_id: 7, user_id: 1, title: 'Graphs' }, null);

    const contentCall = addDocuments.mock.calls[0] as unknown as [Document[], { ids: string[] }];
    const [documents, options] = contentCall;

    expect(documents.length).toBeGreaterThan(1);
    expect(options.ids[0]).toBe('note_7_content_0');
    expect(options.ids[1]).toBe('note_7_content_1');
    expect(documents[0].metadata.embedding_type).toBe('content');
    expect(documents[0].metadata.chunk_index).toBe(0);
    expect(documents[0].metadata.chunk_count).toBe(documents.length);
  });

  it('prunes stale chunks after writing, keeping the new ones', async () => {
    await upsertDocument(7, 'short note', { note_id: 7, user_id: 1 }, null);

    // Write happens first so a failed re-index cannot leave the note unindexed.
    expect(addDocuments.mock.invocationCallOrder[0]).toBeLessThan(
      deleteVectors.mock.invocationCallOrder[0],
    );

    const deletedIds = (deleteVectors.mock.calls[0] as unknown as [{ ids: string[] }])[0].ids;
    expect(deletedIds).toContain('note_7_content'); // pre-chunking id
    expect(deletedIds).toContain(`note_7_content_${MAX_CHUNKS_PER_DOCUMENT - 1}`);
    expect(deletedIds).not.toContain('note_7_content_0'); // just written
  });

  it('writes a single un-chunked summary vector', async () => {
    await upsertDocument(7, 'body', { note_id: 7, user_id: 1 }, 'a short summary');

    const summaryCall = addDocuments.mock.calls.at(-1) as unknown as [
      Document[],
      { ids: string[] },
    ];
    expect(summaryCall[1].ids).toEqual(['note_7_summary']);
    expect(summaryCall[0][0].metadata.embedding_type).toBe('summary');
  });

  it('removes the summary vector when the summary is cleared', async () => {
    await upsertDocument(7, 'body', { note_id: 7, user_id: 1 }, '');

    const deletedIdSets = deleteVectors.mock.calls.map(
      (call) => (call as unknown as [{ ids: string[] }])[0].ids,
    );
    expect(deletedIdSets.some((ids) => ids.includes('note_7_summary'))).toBe(true);
  });
});

describe('deleteDocument', () => {
  it('removes every id a note could occupy', async () => {
    await deleteDocument(42);

    const deletedIds = (deleteVectors.mock.calls[0] as unknown as [{ ids: string[] }])[0].ids;
    expect(deletedIds).toContain('note_42_summary');
    expect(deletedIds).toContain('note_42_content');
    expect(deletedIds).toContain('note_42_content_0');
  });
});

describe('upsertFileDocument', () => {
  it('namespaces file vectors separately from notes', async () => {
    const chunks = await upsertFileDocument(3, 'the contents of an uploaded file', {
      file_id: 3,
      user_id: 1,
    });

    expect(chunks).toBe(1);
    const options = (addDocuments.mock.calls[0] as unknown as [Document[], { ids: string[] }])[1];
    expect(options.ids).toEqual(['file_3_content_0']);
  });
});

describe('querySimilarNotes', () => {
  const match = (metadata: Record<string, unknown>, content = 'chunk'): [Document, number] => [
    new Document({ pageContent: content, metadata }),
    0.85,
  ];

  it('scopes the search to the user and embedding type', async () => {
    similaritySearchVectorWithScore.mockResolvedValueOnce([match({ note_id: 1, user_id: 9 })]);

    await querySimilarNotes({ queryText: 'q', userId: 9, embeddingTypeFilter: 'content' });

    const filter = similaritySearchVectorWithScore.mock.calls[0][2];
    expect(filter).toMatchObject({ user_id: 9, embedding_type: 'content' });
  });

  it('drops matches below minScore', async () => {
    similaritySearchVectorWithScore.mockResolvedValueOnce([
      [new Document({ pageContent: 'relevant', metadata: { note_id: 1 } }), 0.9],
      [new Document({ pageContent: 'noise', metadata: { note_id: 2 } }), 0.2],
    ]);

    const results = await querySimilarNotes({
      queryText: 'q',
      userId: 1,
      embeddingTypeFilter: 'content',
      minScore: 0.5,
    });

    expect(results).toHaveLength(1);
    expect(results[0].page_content).toBe('relevant');
  });

  it('identifies file matches as well as note matches', async () => {
    similaritySearchVectorWithScore.mockResolvedValueOnce([
      match({ note_id: 1 }),
      match({ file_id: 5 }),
      match({}),
    ]);

    const results = await querySimilarNotes({
      queryText: 'q',
      userId: 1,
      embeddingTypeFilter: 'content',
    });

    // The metadata-less match has no source and is skipped.
    expect(results.map((r) => r.id)).toEqual(['note_1', 'file_5']);
  });

  it('propagates failures instead of reporting an outage as "no results"', async () => {
    similaritySearchVectorWithScore.mockRejectedValue(new Error('pinecone down'));

    await expect(
      querySimilarNotes({ queryText: 'q', userId: 1, embeddingTypeFilter: 'content' }),
    ).rejects.toThrow('pinecone down');
  }, 20_000);
});

describe('dedupeBySource', () => {
  it('keeps the best-scoring chunk per document, ranked by score', () => {
    const matches: VectorMatch[] = [
      { id: 'note_1', score: 0.7, metadata: {}, page_content: 'a' },
      { id: 'note_1', score: 0.9, metadata: {}, page_content: 'b' },
      { id: 'note_2', score: 0.8, metadata: {}, page_content: 'c' },
    ];

    expect(dedupeBySource(matches)).toEqual([
      { id: 'note_1', score: 0.9, metadata: {}, page_content: 'b' },
      { id: 'note_2', score: 0.8, metadata: {}, page_content: 'c' },
    ]);
  });
});
