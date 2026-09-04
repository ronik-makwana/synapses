'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Note, NoteUpdateData, RichTextDoc } from '@/types';
import toast from 'react-hot-toast';
import { FiX } from 'react-icons/fi';
import RichTextEditor, { emptyRichTextDoc, toRichTextDoc } from '@/components/editor/RichTextEditor';

interface EditNoteModalProps {
  note: Note | null; // The note to edit, or null if none
  isOpen: boolean;
  onClose: () => void; // Function to close the modal
  onUpdate: (noteId: number, data: NoteUpdateData) => Promise<void>; // Function to call when update is submitted
}

const EditNoteModal: React.FC<EditNoteModalProps> = ({ 
  note,
  isOpen,
  onClose,
  onUpdate 
}) => {
  // Form state
  const [title, setTitle] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // The note's document, derived during render rather than in an effect: the
  // editor reads its content on mount, which happens before effects run, so
  // loading it from state would leave the editor showing an empty document.
  // Notes written before the rich editor have a null `contentJson`; their plain
  // text is promoted to a document here so they open populated, not blank.
  const initialDoc = useMemo(
    () => (note ? toRichTextDoc(note.contentJson, note.content) : emptyRichTextDoc()),
    [note],
  );

  // Holds the edited document, or null while it is still untouched — in which
  // case `initialDoc` is what a save should send.
  const [editedDoc, setEditedDoc] = useState<RichTextDoc | null>(null);

  // Initialize form state when the note prop changes or modal opens
  useEffect(() => {
    setTitle(note?.title || '');
    setEditedDoc(null);
    setError(null); // Clear previous errors when modal opens/note changes
  }, [note, isOpen]); // Dependency array includes isOpen to reset on close/reopen

  // Early return if the modal is not open or no note is selected
  if (!isOpen || !note) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!note) return; // Should not happen if modal is open, but safety check

    if (!title.trim()) {
        setError('Title cannot be empty.');
        return;
    }

    setIsLoading(true);
    try {
      const updateData: NoteUpdateData = { title, contentJson: editedDoc ?? initialDoc };
      await onUpdate(note.id, updateData); // Call the onUpdate prop passed from SidePanel
      // onClose(); // Closing is handled by SidePanel after successful update
    } catch (err: unknown) {
      console.error("EditNoteModal update error:", err);
      const message = err instanceof Error ? err.message : 'Failed to update note.';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // Modal Overlay - Use bg-black/50 for semi-transparent background
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300 ease-in-out">
      {/* Modal Content */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto mx-auto">
        <div className="flex justify-between items-start gap-3 mb-4">
          {/* The note's own title identifies it far better than its row ID did. */}
          <h2 className="text-xl font-semibold text-gray-900 min-w-0">
            Edit{' '}
            <span className="font-normal text-gray-600" title={note.title || undefined}>
              {note.title || 'Untitled Note'}
            </span>
          </h2>
          <button
            type="button" // Inside the form — a bare button would submit it.
            onClick={onClose}
            disabled={isLoading}
            title="Close"
            aria-label="Close"
            className="shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none disabled:opacity-50"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        
        {/* Form Inputs */}
        <div className="space-y-4">
          <div>
            <label htmlFor="edit-note-title" className="block text-sm font-medium text-gray-700">Title</label>
            <input
              id="edit-note-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-violet-500 focus:border-violet-500 sm:text-sm bg-white text-gray-900"
            />
          </div>
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">Content</span>
            {/* The editor reads its document once on mount, so it is keyed on the
                note to reload when a different one is opened. */}
            <RichTextEditor
              key={note.id}
              initialContent={initialDoc}
              onChange={setEditedDoc}
              placeholder="Write your note…"
              minHeight="14rem"
              disabled={isLoading}
            />
          </div>
          {/* Tags are generated in a background pass after a save, so a note saved
              moments ago has none yet. Hide the section entirely rather than
              showing an empty one. */}
          {note.tags && note.tags.length > 0 && (
            <div>
              <span className="block text-sm font-medium text-gray-700">Tags</span>
              <div className="mt-1 flex flex-wrap gap-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-violet-100 text-violet-800 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
           {error && (
             <p className="text-sm text-red-600">{error}</p>
           )}
        </div>

        {/* Modal Actions */}
        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button" // Important: Prevent default form submission
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            type="submit" // This button submits the form
            disabled={isLoading}
            className="px-4 py-2 bg-violet-600 text-white rounded-md hover:bg-violet-700 transition duration-150 disabled:opacity-50"
          >
             {isLoading ? 'Saving...' : 'Save Changes'} 
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditNoteModal; 