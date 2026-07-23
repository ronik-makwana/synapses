// Retrieval-Augmented Generation. Mirrors app/ai/rag.py.
import { ChatOpenAI } from '@langchain/openai';

import { settings } from '../config';
import { querySimilarNotes, type SimilarNote } from './vectorstore';

export interface RagSource {
  note_id: number;
  title: string;
}

export interface RagResult {
  answer: string;
  sources: RagSource[];
}

function formatDocs(docs: SimilarNote[]): string {
  return docs
    .map((d) => d.page_content)
    .filter((c) => c && c.length > 0)
    .join('\n\n');
}

export async function generateRagAnswer(query: string, userId: number): Promise<RagResult> {
  try {
    // 1. Retrieve relevant content vectors.
    const retrieved = await querySimilarNotes({
      queryText: query,
      userId,
      topK: 4,
      embeddingTypeFilter: 'content',
    });

    // 2. Build the prompt.
    const context = formatDocs(retrieved);
    const prompt = `
        You are a helpful assistant. Answer the following question based ONLY on the context provided below.
        Keep your answer concise and informative.

        Context:
        ${context}

        Question: ${query}

        Answer:
        `;

    // 3. Invoke the LLM.
    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      apiKey: settings.OPENAI_API_KEY,
    });
    const response = await llm.invoke(prompt);
    const answer =
      typeof response.content === 'string' ? response.content : String(response.content);

    // 4. Assemble sources.
    const sources: RagSource[] = [];
    for (const doc of retrieved) {
      const noteId = doc.metadata.note_id as number | undefined;
      const title = doc.metadata.title as string | undefined;
      if (noteId != null) {
        sources.push({ note_id: noteId, title: title || 'Untitled Note' });
      }
    }

    return { answer, sources };
  } catch (err) {
    console.error(`Error during RAG generation for user ${userId}:`, err);
    return {
      answer: 'Sorry, an error occurred while trying to answer your question.',
      sources: [],
    };
  }
}
