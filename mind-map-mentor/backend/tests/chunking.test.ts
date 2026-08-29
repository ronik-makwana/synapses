import { describe, it, expect } from 'vitest';

import {
  chunkText,
  DEFAULT_CHUNK_SIZE,
  MAX_CHUNKS_PER_DOCUMENT,
} from '../src/ai/chunking';

describe('chunkText', () => {
  it('returns no chunks for empty or whitespace-only text', () => {
    expect(chunkText('')).toEqual([]);
    expect(chunkText('   \n\n  ')).toEqual([]);
  });

  it('returns a single chunk when the text already fits', () => {
    const text = 'A short note about embeddings.';
    expect(chunkText(text)).toEqual([text]);
  });

  it('splits text longer than the chunk size', () => {
    const text = 'sentence. '.repeat(600); // ~6000 chars
    const chunks = chunkText(text);

    expect(chunks.length).toBeGreaterThan(1);
    for (const chunk of chunks) {
      expect(chunk.length).toBeLessThanOrEqual(DEFAULT_CHUNK_SIZE);
    }
  });

  it('prefers paragraph boundaries over mid-sentence cuts', () => {
    const paragraph = 'x'.repeat(400);
    const chunks = chunkText([paragraph, paragraph, paragraph].join('\n\n'), {
      chunkSize: 500,
      chunkOverlap: 0,
    });

    expect(chunks).toHaveLength(3);
    for (const chunk of chunks) {
      expect(chunk).toBe(paragraph);
    }
  });

  it('overlaps consecutive chunks so boundary passages stay retrievable', () => {
    const text = 'abcdefghij'.repeat(50); // 500 chars, no separators
    const chunks = chunkText(text, { chunkSize: 100, chunkOverlap: 20 });

    expect(chunks.length).toBeGreaterThan(1);
    const tail = chunks[0].slice(-20);
    expect(chunks[1].startsWith(tail)).toBe(true);
  });

  it('preserves the original text across chunks', () => {
    const text = Array.from({ length: 40 }, (_, i) => `Paragraph ${i} about knowledge graphs.`).join(
      '\n\n',
    );
    const chunks = chunkText(text, { chunkSize: 200, chunkOverlap: 0 });

    expect(chunks.join('\n\n')).toBe(text);
  });

  it('caps the number of chunks so one document cannot flood the index', () => {
    const text = 'y'.repeat(DEFAULT_CHUNK_SIZE * (MAX_CHUNKS_PER_DOCUMENT + 20));
    const chunks = chunkText(text);

    expect(chunks).toHaveLength(MAX_CHUNKS_PER_DOCUMENT);
  });

  it('rejects an overlap that is not smaller than the chunk size', () => {
    expect(() => chunkText('some text', { chunkSize: 100, chunkOverlap: 100 })).toThrow(
      /chunkOverlap/,
    );
  });
});
