import { describe, it, expect } from 'vitest';

import {
  richTextToPlainText,
  sanitizeRichText,
  plainTextToRichText,
} from '../src/core/richtext';
import { chunkText } from '../src/ai/chunking';

/** Build a paragraph with optional marks on the whole run. */
const p = (text: string, marks?: string[]) => ({
  type: 'paragraph',
  content: [{ type: 'text', text, ...(marks ? { marks: marks.map((type) => ({ type })) } : {}) }],
});

const doc = (...content: unknown[]) => ({ type: 'doc', content });

describe('richTextToPlainText', () => {
  it('returns empty string for anything that is not a document', () => {
    expect(richTextToPlainText(null)).toBe('');
    expect(richTextToPlainText(undefined)).toBe('');
    expect(richTextToPlainText('not a doc')).toBe('');
    expect(richTextToPlainText([])).toBe('');
  });

  it('drops formatting marks, keeping only the words that get embedded', () => {
    const input = doc(
      p('bold', ['bold']),
      p('italic', ['italic']),
      p('struck', ['strike']),
      p('underlined', ['underline']),
    );
    expect(richTextToPlainText(input)).toBe('bold\n\nitalic\n\nstruck\n\nunderlined');
  });

  it('keeps link text and discards the href', () => {
    const input = doc({
      type: 'paragraph',
      content: [
        { type: 'text', text: 'see ' },
        {
          type: 'text',
          text: 'the docs',
          marks: [{ type: 'link', attrs: { href: 'https://example.com' } }],
        },
      ],
    });
    expect(richTextToPlainText(input)).toBe('see the docs');
  });

  it('ignores text alignment entirely', () => {
    const centered = doc({
      type: 'paragraph',
      attrs: { textAlign: 'center' },
      content: [{ type: 'text', text: 'centered' }],
    });
    expect(richTextToPlainText(centered)).toBe('centered');
  });

  it('prefixes headings so retrieved passages keep their section boundary', () => {
    const input = doc(
      { type: 'heading', attrs: { level: 2 }, content: [{ type: 'text', text: 'Retrieval' }] },
      p('Chunks overlap.'),
    );
    expect(richTextToPlainText(input)).toBe('## Retrieval\n\nChunks overlap.');
  });

  it('clamps out-of-range and missing heading levels', () => {
    const build = (level: unknown) =>
      richTextToPlainText(
        doc({ type: 'heading', attrs: { level }, content: [{ type: 'text', text: 'T' }] }),
      );
    expect(build(9)).toBe('###### T');
    expect(build(0)).toBe('# T');
    expect(build(undefined)).toBe('# T');
  });

  it('keeps a list together as one block, one item per line', () => {
    const input = doc({
      type: 'bulletList',
      content: [
        { type: 'listItem', content: [p('first')] },
        { type: 'listItem', content: [p('second')] },
      ],
    });
    expect(richTextToPlainText(input)).toBe('- first\n- second');
  });

  it('numbers ordered lists', () => {
    const input = doc({
      type: 'orderedList',
      content: [
        { type: 'listItem', content: [p('first')] },
        { type: 'listItem', content: [p('second')] },
        { type: 'listItem', content: [p('third')] },
      ],
    });
    expect(richTextToPlainText(input)).toBe('1. first\n2. second\n3. third');
  });

  it('honours an ordered list that does not start at one', () => {
    const input = doc({
      type: 'orderedList',
      attrs: { start: 5 },
      content: [
        { type: 'listItem', content: [p('five')] },
        { type: 'listItem', content: [p('six')] },
      ],
    });
    expect(richTextToPlainText(input)).toBe('5. five\n6. six');
  });

  it('indents nested lists', () => {
    const input = doc({
      type: 'bulletList',
      content: [
        {
          type: 'listItem',
          content: [
            p('outer'),
            { type: 'bulletList', content: [{ type: 'listItem', content: [p('inner')] }] },
          ],
        },
      ],
    });
    expect(richTextToPlainText(input)).toBe('- outer\n  - inner');
  });

  it('turns hard breaks into single newlines', () => {
    const input = doc({
      type: 'paragraph',
      content: [{ type: 'text', text: 'a' }, { type: 'hardBreak' }, { type: 'text', text: 'b' }],
    });
    expect(richTextToPlainText(input)).toBe('a\nb');
  });

  it('skips empty paragraphs and horizontal rules rather than emitting blank blocks', () => {
    const input = doc(p('one'), { type: 'paragraph' }, { type: 'horizontalRule' }, p('two'));
    expect(richTextToPlainText(input)).toBe('one\n\ntwo');
  });

  it('reaches text inside unrecognised block types', () => {
    const input = doc({ type: 'blockquote', content: [p('quoted')] });
    expect(richTextToPlainText(input)).toBe('quoted');
  });

  it('survives a deeply nested document without overflowing the stack', () => {
    let node: unknown = p('deep');
    for (let i = 0; i < 5000; i += 1) node = { type: 'blockquote', content: [node] };
    expect(() => richTextToPlainText(doc(node))).not.toThrow();
  });

  it('emits the blank lines chunkText splits on', () => {
    // The whole point of the markdown-flavoured projection: paragraph
    // boundaries have to survive into the text the chunker sees.
    const paragraphs = Array.from({ length: 40 }, (_, i) => p(`Paragraph ${i}. `.repeat(20)));
    const text = richTextToPlainText(doc(...paragraphs));

    const chunks = chunkText(text);
    expect(chunks.length).toBeGreaterThan(1);
    // A boundary-respecting split never starts a chunk mid-word.
    for (const chunk of chunks) {
      expect(chunk).toBe(chunk.trim());
    }
  });
});

describe('sanitizeRichText', () => {
  const linked = (href: string) =>
    doc({
      type: 'paragraph',
      content: [{ type: 'text', text: 'click', marks: [{ type: 'link', attrs: { href } }] }],
    });

  const marksOf = (sanitized: unknown) =>
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (sanitized as any).content[0].content[0].marks;

  it('keeps http, https and mailto links', () => {
    for (const href of ['https://example.com', 'http://example.com', 'mailto:a@b.com']) {
      expect(marksOf(sanitizeRichText(linked(href)))).toHaveLength(1);
    }
  });

  it('strips javascript: and data: links', () => {
    for (const href of ['javascript:alert(1)', 'JavaScript:alert(1)', 'data:text/html,<script>']) {
      expect(marksOf(sanitizeRichText(linked(href)))).toHaveLength(0);
    }
  });

  it('keeps relative and same-document links', () => {
    expect(marksOf(sanitizeRichText(linked('/notes/1')))).toHaveLength(1);
    expect(marksOf(sanitizeRichText(linked('#section')))).toHaveLength(1);
  });

  it('leaves non-link marks alone', () => {
    const input = doc(p('bold', ['bold']));
    expect(marksOf(sanitizeRichText(input))).toEqual([{ type: 'bold' }]);
  });

  it('does not mutate the input document', () => {
    const input = linked('javascript:alert(1)');
    const before = JSON.stringify(input);
    sanitizeRichText(input);
    expect(JSON.stringify(input)).toBe(before);
  });
});

describe('plainTextToRichText', () => {
  it('round-trips through the plain-text projection unchanged', () => {
    const text = 'First paragraph.\n\nSecond paragraph.';
    expect(richTextToPlainText(plainTextToRichText(text))).toBe(text);
  });

  it('produces a document with at least one block for empty text', () => {
    expect(plainTextToRichText('')).toEqual({ type: 'doc', content: [{ type: 'paragraph' }] });
  });
});
