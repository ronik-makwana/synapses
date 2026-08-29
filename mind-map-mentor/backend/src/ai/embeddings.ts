// Embedding functions using Google Gemini. Mirrors app/ai/embeddings.py.
//
// Gemini embeddings are asymmetric: documents and queries are embedded with
// different task types, and mixing them costs recall. Two memoized instances are
// exposed — one for indexing, one for searching.
import type { TaskType } from '@google/generative-ai';
import { GoogleGenerativeAIEmbeddings } from '@langchain/google-genai';

import { settings } from '../config';

const RETRIEVAL_DOCUMENT = 'RETRIEVAL_DOCUMENT' as TaskType;
const RETRIEVAL_QUERY = 'RETRIEVAL_QUERY' as TaskType;

let documentEmbeddings: GoogleGenerativeAIEmbeddings | null = null;
let queryEmbeddings: GoogleGenerativeAIEmbeddings | null = null;

function build(taskType: TaskType): GoogleGenerativeAIEmbeddings {
  return new GoogleGenerativeAIEmbeddings({
    model: settings.GOOGLE_EMBEDDING_MODEL,
    apiKey: settings.GOOGLE_API_KEY,
    taskType,
  });
}

/** Embedder for text being indexed. */
export function getDocumentEmbeddingFunction(): GoogleGenerativeAIEmbeddings {
  documentEmbeddings ??= build(RETRIEVAL_DOCUMENT);
  return documentEmbeddings;
}

/** Embedder for search queries. */
export function getQueryEmbeddingFunction(): GoogleGenerativeAIEmbeddings {
  queryEmbeddings ??= build(RETRIEVAL_QUERY);
  return queryEmbeddings;
}
