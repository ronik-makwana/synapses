// Text chunking for embeddings.
//
// `gemini-embedding-001` caps input at roughly 2k tokens, so a whole note can
// neither be embedded in one call nor retrieved precisely. Documents are split
// into overlapping chunks before they are embedded; each chunk becomes its own
// vector so retrieval returns the relevant passage instead of a whole note.

/** Chunk size in characters (~1/4 of a token, so ~375 tokens per chunk). */
export const DEFAULT_CHUNK_SIZE = 1500;

/** Characters repeated from the previous chunk, so a passage that straddles a
 *  boundary is still fully present in at least one chunk. */
export const DEFAULT_CHUNK_OVERLAP = 200;

/**
 * Upper bound on chunks per document. Also the width of the vector-ID range the
 * store deletes when re-indexing, so raising it is safe but lowering it would
 * orphan vectors that were written under the old bound.
 */
export const MAX_CHUNKS_PER_DOCUMENT = 100;

/** Separators tried in order, from most to least semantic. */
const SEPARATORS = ['\n\n', '\n', '. ', ' '];

export interface ChunkOptions {
  chunkSize?: number;
  chunkOverlap?: number;
  maxChunks?: number;
}

/** Split `text` on the first separator that yields pieces within `size`. */
function splitRecursive(text: string, size: number, separators: string[]): string[] {
  if (text.length <= size) return text ? [text] : [];

  const [separator, ...remaining] = separators;

  // No separator left: hard-cut at the size boundary.
  if (separator === undefined) {
    const pieces: string[] = [];
    for (let i = 0; i < text.length; i += size) {
      pieces.push(text.slice(i, i + size));
    }
    return pieces;
  }

  const parts = text.split(separator);
  if (parts.length === 1) {
    // Separator absent — fall through to the next one.
    return splitRecursive(text, size, remaining);
  }

  const pieces: string[] = [];
  parts.forEach((part, index) => {
    // Re-attach the separator so joining the chunks reproduces the original text.
    const piece = index < parts.length - 1 ? part + separator : part;
    if (!piece) return;
    if (piece.length <= size) {
      pieces.push(piece);
    } else {
      pieces.push(...splitRecursive(piece, size, remaining));
    }
  });
  return pieces;
}

/** Greedily merge pieces up to `size`, carrying `overlap` characters forward. */
function mergePieces(pieces: string[], size: number, overlap: number): string[] {
  const chunks: string[] = [];
  let current = '';

  for (const piece of pieces) {
    if (current && current.length + piece.length > size) {
      chunks.push(current);
      current = overlap > 0 ? current.slice(-overlap) : '';
    }
    current += piece;
  }
  if (current.trim()) chunks.push(current);

  return chunks;
}

/**
 * Split text into overlapping chunks suitable for embedding.
 * Returns `[]` for empty input and a single chunk for text that already fits.
 */
export function chunkText(text: string, options: ChunkOptions = {}): string[] {
  const chunkSize = options.chunkSize ?? DEFAULT_CHUNK_SIZE;
  const chunkOverlap = options.chunkOverlap ?? DEFAULT_CHUNK_OVERLAP;
  const maxChunks = options.maxChunks ?? MAX_CHUNKS_PER_DOCUMENT;

  if (chunkOverlap >= chunkSize) {
    throw new Error('chunkOverlap must be smaller than chunkSize');
  }

  const trimmed = (text ?? '').trim();
  if (!trimmed) return [];
  if (trimmed.length <= chunkSize) return [trimmed];

  const pieces = splitRecursive(trimmed, chunkSize, SEPARATORS);
  const chunks = mergePieces(pieces, chunkSize, chunkOverlap)
    .map((chunk) => chunk.trim())
    .filter((chunk) => chunk.length > 0);

  if (chunks.length > maxChunks) {
    console.warn(
      `[chunking] Document produced ${chunks.length} chunks; truncating to ${maxChunks}. ` +
        'Content beyond that point will not be searchable.',
    );
    return chunks.slice(0, maxChunks);
  }

  return chunks;
}
