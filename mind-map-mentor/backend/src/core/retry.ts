// Small retry helper for flaky network calls (Pinecone / Gemini).

export interface RetryOptions {
  attempts?: number;
  baseDelayMs?: number;
  label?: string;
}

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Run `fn`, retrying with exponential backoff. Rethrows the last error once the
 * attempts are exhausted so the caller can decide how to surface the failure.
 */
export async function withRetry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const attempts = options.attempts ?? 3;
  const baseDelayMs = options.baseDelayMs ?? 500;
  const label = options.label ?? 'operation';

  let lastError: unknown;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt === attempts) break;
      const delay = baseDelayMs * 2 ** (attempt - 1);
      console.warn(`[retry] ${label} failed (attempt ${attempt}/${attempts}), retrying in ${delay}ms:`, err);
      await sleep(delay);
    }
  }
  throw lastError;
}
