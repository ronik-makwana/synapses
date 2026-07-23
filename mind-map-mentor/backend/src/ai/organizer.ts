// LLM tag suggestion. Mirrors app/ai/agents/organizer.py.
import { ChatOpenAI } from '@langchain/openai';

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
  if (!settings.OPENAI_API_KEY) {
    console.error('OPENAI_API_KEY not configured. Cannot suggest tags.');
    return [];
  }

  try {
    const llm = new ChatOpenAI({
      model: 'gpt-4o-mini',
      temperature: 0.2,
      apiKey: settings.OPENAI_API_KEY,
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
