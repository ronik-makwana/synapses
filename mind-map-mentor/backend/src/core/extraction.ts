// Text extraction for uploaded files.
//
// Uploads previously created a graph node and nothing else, so files were never
// searchable and never reachable by RAG. Text-based formats are decoded here and
// handed to the vector store; binary formats are skipped explicitly rather than
// failing silently.
import path from 'path';

/** Extensions treated as UTF-8 text regardless of the browser-supplied MIME type. */
const TEXT_EXTENSIONS = new Set([
  '.txt', '.md', '.markdown', '.rst', '.log', '.csv', '.tsv',
  '.json', '.jsonl', '.yaml', '.yml', '.toml', '.ini', '.env',
  '.xml', '.html', '.htm', '.css', '.sql',
  '.js', '.jsx', '.ts', '.tsx', '.py', '.rb', '.go', '.rs',
  '.java', '.c', '.h', '.cpp', '.sh',
]);

/** Non-`text/*` MIME types that still carry text. */
const TEXT_MIME_TYPES = new Set([
  'application/json',
  'application/ld+json',
  'application/xml',
  'application/xhtml+xml',
  'application/javascript',
  'application/typescript',
  'application/x-yaml',
  'application/yaml',
  'application/sql',
]);

/** Guard against embedding a 200MB log; the tail is dropped, not the file. */
export const MAX_EXTRACTED_CHARS = 200_000;

export function isExtractableMimeType(mimeType?: string | null, filename?: string | null): boolean {
  const extension = path.extname(filename ?? '').toLowerCase();
  if (extension && TEXT_EXTENSIONS.has(extension)) return true;

  const mime = (mimeType ?? '').toLowerCase().split(';')[0].trim();
  if (!mime) return false;
  return mime.startsWith('text/') || TEXT_MIME_TYPES.has(mime);
}

/** Heuristic binary check: NUL bytes never appear in UTF-8 text. */
function looksBinary(buffer: Buffer): boolean {
  const sample = buffer.subarray(0, 4096);
  return sample.includes(0);
}

/**
 * Decode an uploaded file to plain text, or return `null` when the format is not
 * supported (PDF, images, Office documents — those need a dedicated parser).
 */
export function extractText(
  buffer: Buffer,
  mimeType?: string | null,
  filename?: string | null,
): string | null {
  if (!buffer || buffer.length === 0) return null;
  if (!isExtractableMimeType(mimeType, filename)) return null;
  if (looksBinary(buffer)) return null;

  // Strip stray NUL bytes; they break some downstream JSON encoders.
  const text = buffer.toString('utf8').replace(/\u0000/g, '').trim();
  if (!text) return null;

  return text.length > MAX_EXTRACTED_CHARS ? text.slice(0, MAX_EXTRACTED_CHARS) : text;
}
