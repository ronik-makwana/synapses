// LLM tag suggestion. Mirrors app/ai/agents/organizer.py.
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import { settings } from '../config';

/** Tags kept per note. The prompt asks for exactly this many so the model is not
 *  paid to produce tags that are then discarded. */
const MAX_TAGS = 2;

/**
 * Analyze text content with an LLM and return relevant tags.
 * Returns [] on empty content or failure.
 */
export async function suggestTagsForContent(content: string): Promise<string[]> {
  if (!content || !content.trim()) {
    return [];
  }

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: settings.GOOGLE_CHAT_MODEL,
      temperature: 0.2,
      apiKey: settings.GOOGLE_API_KEY,
    });

    const prompt = `Analyze the following text and extract the ${MAX_TAGS} most relevant and concise keywords or tags.
Present the tags as a comma-separated list ONLY, with no introductory text or numbering.
Ensure tags are lowercase.
Example: artificial intelligence, machine learning

Text:
${content}`;

    const response = await llm.invoke(prompt);
    const raw = typeof response.content === 'string' ? response.content : String(response.content);
    if (!raw) return [];

    const tags = raw
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    return tags.slice(0, MAX_TAGS);
  } catch (err) {
    console.error('Error suggesting tags:', err);
    return [];
  }
}
