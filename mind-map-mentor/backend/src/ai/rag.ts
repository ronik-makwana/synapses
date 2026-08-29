// Retrieval-Augmented Generation. Mirrors app/ai/rag.py.
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import { settings } from '../config';
import { querySimilarNotes, type VectorMatch } from './vectorstore';

/** Chunks pulled per question. Higher than the pre-chunking value of 4 because a
 *  single note can now legitimately contribute several chunks. */
const RAG_TOP_K = 8;

export interface RagSource {
  note_id?: number;
  file_id?: number;
  title: string;
}

export interface RagResult {
  answer: string;
  sources: RagSource[];
}

const NO_CONTEXT_ANSWER =
  "I could not find anything in your notes or files that answers that. Try rephrasing, or add a note on the topic.";

function formatDocs(docs: VectorMatch[]): string {
  return docs
    .map((doc) => {
      const title = typeof doc.metadata.title === 'string' ? doc.metadata.title : 'Untitled';
      return `[${title}]\n${doc.page_content}`;
    })
    .filter((chunk) => chunk.length > 0)
    .join('\n\n---\n\n');
}

/** One entry per source document, in the order the best chunk was ranked. */
function collectSources(docs: VectorMatch[]): RagSource[] {
  const sources: RagSource[] = [];
  const seen = new Set<string>();

  for (const doc of docs) {
    if (seen.has(doc.id)) continue;
    seen.add(doc.id);

    const title =
      typeof doc.metadata.title === 'string' && doc.metadata.title
        ? doc.metadata.title
        : 'Untitled Note';
    const noteId = doc.metadata.note_id as number | undefined;
    const fileId = doc.metadata.file_id as number | undefined;

    if (noteId != null) sources.push({ note_id: noteId, title });
    else if (fileId != null) sources.push({ file_id: fileId, title });
  }
  return sources;
}

export async function generateRagAnswer(query: string, userId: number): Promise<RagResult> {
  try {
    // 1. Retrieve relevant content chunks. Anything below the configured
    //    similarity floor is dropped rather than padded into the prompt.
    const retrieved = await querySimilarNotes({
      queryText: query,
      userId,
      topK: RAG_TOP_K,
      embeddingTypeFilter: 'content',
      minScore: settings.SIMILARITY_THRESHOLD_CONTENT,
    });

    // 2. Nothing relevant: say so instead of asking the model to invent an
    //    answer from an empty context.
    if (retrieved.length === 0) {
      return { answer: NO_CONTEXT_ANSWER, sources: [] };
    }

    // 3. Build the prompt.
    const context = formatDocs(retrieved);
    const prompt = `You are a helpful assistant answering questions about the user's personal notes.
Answer the question using ONLY the context below. If the context does not contain
the answer, say so plainly instead of guessing. Keep your answer concise and informative.

Context:
${context}

Question: ${query}

Answer:`;

    // 4. Invoke the LLM.
    const llm = new ChatGoogleGenerativeAI({
      model: settings.GOOGLE_CHAT_MODEL,
      temperature: 0.2,
      apiKey: settings.GOOGLE_API_KEY,
    });
    const response = await llm.invoke(prompt);
    const answer =
      typeof response.content === 'string' ? response.content : String(response.content);

    // 5. Assemble sources, one per document rather than one per chunk.
    return { answer, sources: collectSources(retrieved) };
  } catch (err) {
    console.error(`Error during RAG generation for user ${userId}:`, err);
    return {
      answer: 'Sorry, an error occurred while trying to answer your question.',
      sources: [],
    };
  }
}
