import { describe, it, expect } from 'vitest';

import { extractText, isExtractableMimeType, MAX_EXTRACTED_CHARS } from '../src/core/extraction';

describe('isExtractableMimeType', () => {
  it('accepts text MIME types', () => {
    expect(isExtractableMimeType('text/plain', 'a.txt')).toBe(true);
    expect(isExtractableMimeType('text/markdown; charset=utf-8', 'a.md')).toBe(true);
    expect(isExtractableMimeType('application/json', 'a.json')).toBe(true);
  });

  it('accepts known text extensions even when the MIME type is generic', () => {
    expect(isExtractableMimeType('application/octet-stream', 'notes.md')).toBe(true);
    expect(isExtractableMimeType(null, 'script.py')).toBe(true);
  });

  it('rejects binary formats', () => {
    expect(isExtractableMimeType('application/pdf', 'paper.pdf')).toBe(false);
    expect(isExtractableMimeType('image/png', 'diagram.png')).toBe(false);
    expect(isExtractableMimeType(null, 'archive.zip')).toBe(false);
  });
});

describe('extractText', () => {
  it('decodes UTF-8 text', () => {
    const buffer = Buffer.from('# Notes\n\nRAG needs chunking.', 'utf8');
    expect(extractText(buffer, 'text/markdown', 'notes.md')).toBe('# Notes\n\nRAG needs chunking.');
  });

  it('returns null for unsupported formats', () => {
    expect(extractText(Buffer.from('%PDF-1.7'), 'application/pdf', 'paper.pdf')).toBeNull();
  });

  it('returns null for empty files', () => {
    expect(extractText(Buffer.alloc(0), 'text/plain', 'empty.txt')).toBeNull();
    expect(extractText(Buffer.from('   \n '), 'text/plain', 'blank.txt')).toBeNull();
  });

  it('returns null when a text-typed file is actually binary', () => {
    const buffer = Buffer.from([0x68, 0x69, 0x00, 0x01, 0x02]);
    expect(extractText(buffer, 'text/plain', 'lying.txt')).toBeNull();
  });

  it('truncates very large files instead of embedding them whole', () => {
    const buffer = Buffer.from('z'.repeat(MAX_EXTRACTED_CHARS + 5_000), 'utf8');
    expect(extractText(buffer, 'text/plain', 'huge.log')).toHaveLength(MAX_EXTRACTED_CHARS);
  });
});
