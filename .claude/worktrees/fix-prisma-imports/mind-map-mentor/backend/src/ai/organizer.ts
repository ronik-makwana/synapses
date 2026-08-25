// LLM tag suggestion. Mirrors app/ai/agents/organizer.py.
import { ChatGoogleGenerativeAI } from '@langchain/google-genai';

import { settings } from '../config';

/**
 * Analyze text content with an LLM and return relevant tags.
 * Returns [] on empty content or failure. Limited to 2 tags (matching the
 * original backend's behavior).
 */
export async function suggestTagsForContent(content: string): Promise<string[]> {
  if (!content || !content.trim()) {
    return [];
  }

  try {
    const llm = new ChatGoogleGenerativeAI({
      model: 'gemini-3.6-flash',
      temperature: 0.2,
      apiKey: settings.GOOGLE_API_KEY,
    });

    const prompt = `Analyze the following text and extract the 3 to 5 most relevant and concise keywords or tags.
Present the tags as a comma-separated list ONLY, with no introductory text or numbering.
Ensure tags are lowercase.
Example: artificial intelligence, machine learning, data science

Text:
${content}`;

    const response = await llm.invoke(prompt);
    const raw = typeof response.content === 'string' ? response.content : String(response.content);
    if (!raw) return [];

    const tags = raw
      .split(',')
      .map((t) => t.trim().toLowerCase())
      .filter((t) => t.length > 0);

    return tags.slice(0, 2);
  } catch (err) {
    console.error('Error suggesting tags:', err);
    return [];
  }
}
