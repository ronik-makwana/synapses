'use client';

// The note body editor.
//
// A note is stored twice: `contentJson` is this editor's document and is what
// gets reopened here, and `content` is a plain-text projection the backend
// derives from it. The projection is what feeds chunking, embedding, RAG and
// search — so this component only ever emits the JSON document, and never tries
// to author the plain text itself. Keeping that derivation server-side means a
// note written by any other client still ends up correctly indexed.

import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useEditor, useEditorState, EditorContent, type JSONContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Placeholder } from '@tiptap/extensions';
import clsx from 'clsx';
import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdFormatStrikethrough,
  MdLink,
  MdLinkOff,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdKeyboardArrowDown,
  MdCheck,
} from 'react-icons/md';

/** ProseMirror rejects a document with no blocks, so "empty" is one paragraph. */
export const emptyRichTextDoc = (): JSONContent => ({
  type: 'doc',
  content: [{ type: 'paragraph' }],
});

/**
 * Older notes were written before the rich editor existed and have a null
 * `contentJson`, so their plain `content` is promoted to a document on open.
 * Without this they would open blank and a save would wipe them.
 */
export function toRichTextDoc(
  contentJson: JSONContent | null | undefined,
  plainText: string | null | undefined,
): JSONContent {
  if (contentJson && typeof contentJson === 'object') return contentJson;
  const text = (plainText ?? '').trim();
  if (!text) return emptyRichTextDoc();
  return {
    type: 'doc',
    content: text
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean)
      .map((paragraph) => ({ type: 'paragraph', content: [{ type: 'text', text: paragraph }] })),
  };
}

/**
 * Give a bare host name a scheme.
 *
 * Someone typing "example.com" means a website, but stored verbatim it is a
 * relative path and the link would resolve against this app's own origin.
 */
function normalizeHref(raw: string): string {
  const href = raw.trim();
  if (!href) return '';
  // Already absolute, an anchor, or an app-relative path — leave it alone.
  if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith('/') || href.startsWith('#')) {
    return href;
  }
  return `https://${href}`;
}

interface RichTextEditorProps {
  /** Read once on mount. This editor is deliberately uncontrolled — pass a
   *  `key` at the call site to load a different note into it. Syncing a
   *  controlled document back in on every keystroke would fight the cursor. */
  initialContent: JSONContent;
  /** Fires on every change with both representations: the document to persist,
   *  and the plain text, which callers use for length limits and previews. */
  onChange: (doc: JSONContent, plainText: string) => void;
  placeholder?: string;
  minHeight?: string;
  disabled?: boolean;
  /** Draws the error border — e.g. when the parent's length limit is exceeded. */
  invalid?: boolean;
}

/** Only one popover is open at a time, so they share a single piece of state. */
type MenuId = 'heading' | 'list' | 'link' | null;

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  label: string;
  className?: string;
  children: React.ReactNode;
};

const ToolbarButton: React.FC<ToolbarButtonProps> = ({
  onClick,
  active,
  disabled,
  label,
  className,
  children,
}) => (
  <button
    // Toolbars live inside <form> elements here; without this every button
    // would submit the note instead of applying a mark.
    type="button"
    // The important one. A plain click moves focus to the button, which
    // collapses the editor's selection *before* the handler runs — so the
    // command would land on a caret instead of the highlighted words.
    // Suppressing mousedown's default keeps the selection intact.
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    disabled={disabled}
    title={label}
    aria-label={label}
    aria-pressed={active}
    className={clsx(
      'flex h-8 items-center justify-center gap-0.5 rounded px-1.5 text-sm transition-colors',
      'disabled:cursor-not-allowed disabled:opacity-40',
      active
        ? 'bg-violet-100 text-violet-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900',
      className,
    )}
  >
    {children}
  </button>
);

type MenuItemProps = {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
};

const MenuItem: React.FC<MenuItemProps> = ({ onClick, active, children }) => (
  <button
    type="button"
    onMouseDown={(event) => event.preventDefault()}
    onClick={onClick}
    className={clsx(
      'flex w-full items-center gap-2 rounded px-2 py-1.5 text-left transition-colors',
      active ? 'bg-violet-50 text-violet-700' : 'text-gray-700 hover:bg-gray-100',
    )}
  >
    <span className="flex-1">{children}</span>
    {active && <MdCheck className="h-4 w-4 shrink-0" />}
  </button>
);

const Popover: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => (
  <div
    className={clsx(
      'absolute left-0 top-full z-30 mt-1 min-w-[11rem] rounded-md border border-gray-200',
      'bg-white p-1 shadow-lg',
      className,
    )}
  >
    {children}
  </div>
);

const Divider = () => <span className="mx-1 h-5 w-px shrink-0 bg-gray-200" aria-hidden="true" />;

const Chevron = () => <MdKeyboardArrowDown className="h-4 w-4 shrink-0 opacity-60" />;

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  initialContent,
  onChange,
  placeholder = 'Write your note…',
  minHeight = '16rem',
  disabled = false,
  invalid = false,
}) => {
  const [openMenu, setOpenMenu] = useState<MenuId>(null);
  const [linkUrl, setLinkUrl] = useState('');
  const toolbarRef = useRef<HTMLDivElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
        link: {
          openOnClick: false,
          autolink: true,
          // Mirrors the backend's sanitizer, so the editor cannot author a link
          // the server would strip back out on save.
          protocols: ['http', 'https', 'mailto'],
          HTMLAttributes: { rel: 'noopener noreferrer nofollow', target: '_blank' },
        },
      }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
      Placeholder.configure({ placeholder }),
    ],
    [placeholder],
  );

  const editor = useEditor({
    extensions,
    content: initialContent,
    editable: !disabled,
    // Next.js renders this on the server first; rendering the editor immediately
    // would produce markup ProseMirror then rewrites, and React would complain.
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'rich-text focus:outline-none',
        style: `min-height: ${minHeight}`,
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getJSON(), editor.getText()),
  });

  // `EditorContent` re-renders itself, but the toolbar's active states live out
  // here — this subscribes them to the selection so they stay in sync.
  const toolbar = useEditorState({
    editor,
    selector: ({ editor }) => ({
      bold: editor?.isActive('bold') ?? false,
      italic: editor?.isActive('italic') ?? false,
      underline: editor?.isActive('underline') ?? false,
      strike: editor?.isActive('strike') ?? false,
      link: editor?.isActive('link') ?? false,
      h1: editor?.isActive('heading', { level: 1 }) ?? false,
      h2: editor?.isActive('heading', { level: 2 }) ?? false,
      h3: editor?.isActive('heading', { level: 3 }) ?? false,
      bulletList: editor?.isActive('bulletList') ?? false,
      orderedList: editor?.isActive('orderedList') ?? false,
      alignLeft: editor?.isActive({ textAlign: 'left' }) ?? false,
      alignCenter: editor?.isActive({ textAlign: 'center' }) ?? false,
      alignRight: editor?.isActive({ textAlign: 'right' }) ?? false,
      alignJustify: editor?.isActive({ textAlign: 'justify' }) ?? false,
    }),
  });

  // Dismiss an open popover on an outside click or Escape.
  useEffect(() => {
    if (!openMenu) return;
    const onPointerDown = (event: MouseEvent) => {
      if (!toolbarRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [openMenu]);

  // The link field is the one control that intentionally takes focus; the
  // editor's selection survives the blur and `.focus()` restores it on apply.
  useEffect(() => {
    if (openMenu === 'link') linkInputRef.current?.select();
  }, [openMenu]);

  const toggleMenu = useCallback((menu: Exclude<MenuId, null>) => {
    setOpenMenu((current) => (current === menu ? null : menu));
  }, []);

  const openLinkMenu = useCallback(() => {
    if (!editor) return;
    // Prefill with the link already under the cursor, so the popover edits it
    // rather than silently replacing it.
    setLinkUrl((editor.getAttributes('link').href as string | undefined) ?? '');
    toggleMenu('link');
  }, [editor, toggleMenu]);

  const applyLink = useCallback(() => {
    if (!editor) return;
    const href = normalizeHref(linkUrl);
    if (!href) return;

    const chain = editor.chain().focus().extendMarkRange('link');
    if (editor.state.selection.empty && !editor.isActive('link')) {
      // Nothing highlighted: insert the URL as its own linked text instead of
      // applying a mark to a zero-width caret, which would do nothing at all.
      chain
        .insertContent({ type: 'text', text: href, marks: [{ type: 'link', attrs: { href } }] })
        .run();
    } else {
      chain.setLink({ href }).run();
    }
    setOpenMenu(null);
  }, [editor, linkUrl]);

  const removeLink = useCallback(() => {
    editor?.chain().focus().extendMarkRange('link').unsetLink().run();
    setOpenMenu(null);
  }, [editor]);

  /** Run a command and close whichever popover it came from. */
  const run = useCallback((command: () => void) => {
    command();
    setOpenMenu(null);
  }, []);

  if (!editor) {
    // Placeholder of the same height, so the modal does not jump on hydration.
    return (
      <div
        className="rounded-md border border-gray-300 bg-gray-50"
        style={{ minHeight: `calc(${minHeight} + 2.75rem)` }}
      />
    );
  }

  const headingLabel = toolbar?.h1 ? 'H1' : toolbar?.h2 ? 'H2' : toolbar?.h3 ? 'H3' : 'H';
  const listActive = Boolean(toolbar?.bulletList || toolbar?.orderedList);

  return (
    <div
      className={clsx(
        // Not `overflow-hidden`: the toolbar's popovers hang below it and would
        // be clipped away by the editor's own box.
        'rounded-md border bg-white shadow-sm',
        invalid
          ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
          : 'border-gray-300 focus-within:border-violet-500 focus-within:ring-1 focus-within:ring-violet-500',
        disabled && 'opacity-60',
      )}
    >
      <div
        ref={toolbarRef}
        className="relative flex flex-wrap items-center gap-0.5 rounded-t-md border-b border-gray-200 bg-gray-50 px-2 py-1"
      >
        {/* Headings */}
        <div className="relative">
          <ToolbarButton
            label="Heading"
            active={openMenu === 'heading' || headingLabel !== 'H'}
            disabled={disabled}
            onClick={() => toggleMenu('heading')}
          >
            <span className="font-semibold">{headingLabel}</span>
            <Chevron />
          </ToolbarButton>
          {openMenu === 'heading' && (
            <Popover>
              <MenuItem
                active={!toolbar?.h1 && !toolbar?.h2 && !toolbar?.h3}
                onClick={() => run(() => editor.chain().focus().setParagraph().run())}
              >
                <span className="text-sm">Normal text</span>
              </MenuItem>
              {([1, 2, 3] as const).map((level) => (
                <MenuItem
                  key={level}
                  active={toolbar?.[`h${level}` as 'h1' | 'h2' | 'h3']}
                  onClick={() =>
                    run(() => editor.chain().focus().toggleHeading({ level }).run())
                  }
                >
                  <span
                    className={clsx(
                      'font-semibold',
                      level === 1 && 'text-xl',
                      level === 2 && 'text-lg',
                      level === 3 && 'text-base',
                    )}
                  >
                    Heading {level}
                  </span>
                </MenuItem>
              ))}
            </Popover>
          )}
        </div>

        {/* Lists */}
        <div className="relative">
          <ToolbarButton
            label="Lists"
            active={openMenu === 'list' || listActive}
            disabled={disabled}
            onClick={() => toggleMenu('list')}
          >
            {toolbar?.orderedList ? (
              <MdFormatListNumbered className="h-5 w-5" />
            ) : (
              <MdFormatListBulleted className="h-5 w-5" />
            )}
            <Chevron />
          </ToolbarButton>
          {openMenu === 'list' && (
            <Popover>
              <MenuItem
                active={toolbar?.bulletList}
                onClick={() => run(() => editor.chain().focus().toggleBulletList().run())}
              >
                <span className="flex items-center gap-2 text-sm">
                  <MdFormatListBulleted className="h-4 w-4" /> Bullet list
                </span>
              </MenuItem>
              <MenuItem
                active={toolbar?.orderedList}
                onClick={() => run(() => editor.chain().focus().toggleOrderedList().run())}
              >
                <span className="flex items-center gap-2 text-sm">
                  <MdFormatListNumbered className="h-4 w-4" /> Numbered list
                </span>
              </MenuItem>
            </Popover>
          )}
        </div>

        <Divider />

        {/* Inline marks */}
        <ToolbarButton
          label="Bold"
          active={toolbar?.bold}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <MdFormatBold className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          label="Italic"
          active={toolbar?.italic}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <MdFormatItalic className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          label="Strikethrough"
          active={toolbar?.strike}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <MdFormatStrikethrough className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          label="Underline"
          active={toolbar?.underline}
          disabled={disabled}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <MdFormatUnderlined className="h-5 w-5" />
        </ToolbarButton>

        {/* Link */}
        <div className="relative">
          <ToolbarButton
            label={toolbar?.link ? 'Edit link' : 'Add link'}
            active={openMenu === 'link' || toolbar?.link}
            disabled={disabled}
            onClick={openLinkMenu}
          >
            <MdLink className="h-5 w-5" />
          </ToolbarButton>
          {openMenu === 'link' && (
            <Popover className="w-72">
              <div className="flex items-center gap-1 p-1">
                <input
                  ref={linkInputRef}
                  type="url"
                  value={linkUrl}
                  onChange={(event) => setLinkUrl(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      // Inside a <form>: Enter would otherwise save the note.
                      event.preventDefault();
                      applyLink();
                    }
                  }}
                  placeholder="example.com"
                  className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-sm text-gray-900 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                />
                <button
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={applyLink}
                  disabled={!linkUrl.trim()}
                  className="rounded bg-violet-600 px-2.5 py-1 text-sm text-white transition-colors hover:bg-violet-700 disabled:opacity-40"
                >
                  Apply
                </button>
                {toolbar?.link && (
                  <button
                    type="button"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={removeLink}
                    title="Remove link"
                    aria-label="Remove link"
                    className="rounded p-1.5 text-gray-500 transition-colors hover:bg-gray-100 hover:text-red-600"
                  >
                    <MdLinkOff className="h-5 w-5" />
                  </button>
                )}
              </div>
            </Popover>
          )}
        </div>

        <Divider />

        {/* Alignment */}
        <ToolbarButton
          label="Align left"
          active={toolbar?.alignLeft}
          disabled={disabled}
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
        >
          <MdFormatAlignLeft className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          label="Align center"
          active={toolbar?.alignCenter}
          disabled={disabled}
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
        >
          <MdFormatAlignCenter className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          label="Align right"
          active={toolbar?.alignRight}
          disabled={disabled}
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
        >
          <MdFormatAlignRight className="h-5 w-5" />
        </ToolbarButton>
        <ToolbarButton
          label="Justify"
          active={toolbar?.alignJustify}
          disabled={disabled}
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
        >
          <MdFormatAlignJustify className="h-5 w-5" />
        </ToolbarButton>
      </div>

      <EditorContent editor={editor} className="max-h-[45vh] overflow-y-auto px-3 py-2" />
    </div>
  );
};

export default RichTextEditor;
