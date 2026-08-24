// Embedding function using Google Gemini. Mirrors app/ai/embeddings.py.
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

import { settings } from '../config';

const GOOGLE_EMBEDDING_MODEL = 'gemini-embedding-001';

let embeddingFn: GoogleGenerativeAIEmbeddings | null = null;

export function getEmbeddingFunction(): GoogleGenerativeAIEmbeddings {
  if (embeddingFn) return embeddingFn;

  if (!settings.GOOGLE_API_KEY) {
    throw new Error('GOOGLE_API_KEY must be configured.');
  }

  embeddingFn = new GoogleGenerativeAIEmbeddings({
    model: GOOGLE_EMBEDDING_MODEL,
    apiKey: settings.GOOGLE_API_KEY,
  });

  return embeddingFn;
}
