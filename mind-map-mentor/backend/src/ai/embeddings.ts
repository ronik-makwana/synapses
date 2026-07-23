// OpenAI embedding function. Mirrors app/ai/embeddings.py.
import { OpenAIEmbeddings } from '@langchain/openai';

import { settings } from '../config';

// 1536-dimension model, matching the existing Pinecone index.
const OPENAI_EMBEDDING_MODEL = 'text-embedding-3-small';

let embeddingFn: OpenAIEmbeddings | null = null;

export function getEmbeddingFunction(): OpenAIEmbeddings {
  if (embeddingFn) return embeddingFn;
  if (!settings.OPENAI_API_KEY) {
    throw new Error('OPENAI_API_KEY is not configured.');
  }
  embeddingFn = new OpenAIEmbeddings({
    model: OPENAI_EMBEDDING_MODEL,
    apiKey: settings.OPENAI_API_KEY,
  });
  return embeddingFn;
}
