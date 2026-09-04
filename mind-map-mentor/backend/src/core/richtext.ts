// TipTap document handling.
//
// A note is written in a rich-text editor and stored as the editor's own JSON
// document (`Note.contentJson`). Nothing downstream of this file understands
// that shape: chunking, embedding, RAG prompts, tag suggestion and SQL search
// all read `Note.content`, which is a plain-text projection derived here.
//
// The projection is deliberately markdown-flavoured rather than a flat text
// dump. `chunkText` splits on '\n\n' before anything else, so emitting a blank
// line between blocks is what keeps chunk boundaries aligned with paragraphs
// instead of falling through to a hard cut mid-sentence.

/** Loosely-typed TipTap node — the document arrives from the client as JSON. */
interface RichTextNode {
  type?: unknown;
  text?: unknown;
  attrs?: Record<string, unknown>;
  marks?: unknown;
  content?: unknown;
}

/** Depth cap. A hand-crafted payload could otherwise nest deeply enough to
 *  overflow the stack on the recursive walk below. */
const MAX_DEPTH = 60;

/** Link protocols kept when sanitizing. `javascript:` and `data:` are dropped
 *  because the stored document is rendered back into the DOM as HTML. */
const SAFE_LINK_PROTOCOLS = new Set(['http:', 'https:', 'mailto:']);

/** Lists join their items with single newlines; only the list as a whole is a
 *  block, so a bulleted list stays inside one chunk rather than being split
 *  item by item. */
const LIST_TYPES = new Set(['bulletList', 'orderedList', 'taskList']);
const LIST_ITEM_TYPES = new Set(['listItem', 'taskItem']);

function isNode(value: unknown): value is RichTextNode {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function children(node: RichTextNode): RichTextNode[] {
  return Array.isArray(node.content) ? node.content.filter(isNode) : [];
}

function headingLevel(attrs: Record<string, unknown> | undefined): number {
  const level = Number(attrs?.level);
  if (!Number.isFinite(level)) return 1;
  return Math.min(6, Math.max(1, Math.trunc(level)));
}

/**
 * Flatten an inline run (text nodes, hard breaks, anything wrapped in a mark)
 * to a string. Marks carry no text of their own, so bold/italic/underline/link
 * formatting simply disappears — which is what the embedding model wants.
 */
function inlineText(nodes: RichTextNode[], depth: number): string {
  if (depth > MAX_DEPTH) return '';
  let out = '';
  for (const node of nodes) {
    if (typeof node.text === 'string') {
      out += node.text;
    } else if (node.type === 'hardBreak') {
      out += '\n';
    } else {
      out += inlineText(children(node), depth + 1);
    }
  }
  return out;
}

/**
 * Convert one node into zero or more block strings.
 *
 * `marker` is the bullet a parent list wants on its item — '- ' for a bulleted
 * list, '1. ', '2. '… for a numbered one — so the projection keeps the ordering
 * the reader (and the LLM reading a retrieved chunk) actually sees.
 */
function blocksFrom(
  node: RichTextNode,
  depth: number,
  indent: string,
  marker = '- ',
): string[] {
  if (depth > MAX_DEPTH) return [];

  const type = typeof node.type === 'string' ? node.type : '';

  if (type === 'heading') {
    const text = inlineText(children(node), depth).trim();
    // '#' prefixes survive into the chunk and give the splitter — and the LLM
    // reading the retrieved passage — a visible section boundary.
    return text ? [`${indent}${'#'.repeat(headingLevel(node.attrs))} ${text}`] : [];
  }

  if (type === 'paragraph' || type === 'codeBlock') {
    const text = inlineText(children(node), depth);
    return text.trim() ? [indent + text] : [];
  }

  // Rules are pure presentation and add nothing to an embedding.
  if (type === 'horizontalRule') return [];

  if (LIST_ITEM_TYPES.has(type)) {
    // An item's children are paragraphs and possibly a nested list; indent them
    // under the marker so nesting stays readable, then hang the marker off the
    // first line.
    const inner = descend(node, depth, indent + ' '.repeat(marker.length));
    if (inner.length === 0) return [];
    const [first, ...rest] = inner;
    return [[`${indent}${marker}${first.trimStart()}`, ...rest].join('\n')];
  }

  if (LIST_TYPES.has(type)) {
    const ordered = type === 'orderedList';
    const start = Number(node.attrs?.start);
    let counter = Number.isFinite(start) ? Math.trunc(start) : 1;

    // A list is one block, not one per item: keeping it whole means a short
    // list stays inside a single chunk instead of being scattered across two.
    const items = children(node).flatMap((child) => {
      const itemMarker = ordered ? `${counter}. ` : '- ';
      const blocks = blocksFrom(child, depth + 1, indent, itemMarker);
      // Only count items that produced text, so an empty row does not create a
      // gap in the numbering.
      if (blocks.length > 0) counter += 1;
      return blocks;
    });
    return items.length ? [items.join('\n')] : [];
  }

  // doc, blockquote, tables, and any extension this backend does not know
  // about: keep walking so their text is still reachable.
  return descend(node, depth, indent);
}

function descend(node: RichTextNode, depth: number, indent: string): string[] {
  return children(node).flatMap((child) => blocksFrom(child, depth + 1, indent));
}

/**
 * Derive the plain text that gets chunked, embedded, searched and fed to the
 * LLM. Returns '' for anything that is not a usable document, so a malformed
 * payload degrades to an empty note rather than throwing mid-request.
 */
export function richTextToPlainText(doc: unknown): string {
  if (!isNode(doc)) return '';
  return blocksFrom(doc, 0, '')
    .join('\n\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** True when `href` is a protocol safe to render as a link. */
function isSafeHref(href: unknown): boolean {
  if (typeof href !== 'string' || !href.trim()) return false;
  const value = href.trim();
  // Protocol-relative and same-document/relative links carry no scheme to abuse.
  if (value.startsWith('/') || value.startsWith('#')) return true;
  try {
    return SAFE_LINK_PROTOCOLS.has(new URL(value).protocol);
  } catch {
    // No parseable scheme — TipTap's autolink will resolve it against http.
    return !value.includes(':');
  }
}

/**
 * Strip link marks whose href is not a safe protocol.
 *
 * The document is written by the client and rendered back as HTML, so a stored
 * `javascript:` href would execute on every later view. Sanitizing on write
 * means every reader — this app, and anything added later — is covered by one
 * check rather than each having to remember its own.
 */
export function sanitizeRichText(doc: unknown, depth = 0): unknown {
  if (Array.isArray(doc)) {
    if (depth > MAX_DEPTH) return [];
    return doc.map((item) => sanitizeRichText(item, depth + 1));
  }
  if (!isNode(doc)) return doc;
  if (depth > MAX_DEPTH) return {};

  const node = doc as Record<string, unknown>;
  const next: Record<string, unknown> = { ...node };

  if (Array.isArray(node.marks)) {
    next.marks = node.marks.filter((mark) => {
      if (!isNode(mark) || mark.type !== 'link') return true;
      return isSafeHref((mark.attrs as Record<string, unknown> | undefined)?.href);
    });
  }
  if (Array.isArray(node.content)) {
    next.content = node.content.map((child) => sanitizeRichText(child, depth + 1));
  }
  return next;
}

/**
 * Wrap plain text in a minimal TipTap document.
 *
 * Used when a caller writes `content` without a `contentJson` — the inline
 * editor on a canvas node, or any client predating the rich editor. Without
 * this the two columns would drift apart and the editor would reopen stale
 * text over a newer plain-text edit.
 */
export function plainTextToRichText(text: string): unknown {
  const paragraphs = (text ?? '').split(/\n{2,}/);
  const content = paragraphs
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0)
    .map((paragraph) => ({
      type: 'paragraph',
      content: [{ type: 'text', text: paragraph }],
    }));

  // ProseMirror requires at least one block, so an empty note is one empty paragraph.
  return { type: 'doc', content: content.length > 0 ? content : [{ type: 'paragraph' }] };
}
