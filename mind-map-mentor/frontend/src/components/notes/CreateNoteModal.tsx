'use client';

import React, { useState, useEffect } from 'react';
import { NoteCreateData, RichTextDoc } from '@/types';
import toast from 'react-hot-toast';
import clsx from 'clsx';
import { FiX } from 'react-icons/fi';
import RichTextEditor, { emptyRichTextDoc } from '@/components/editor/RichTextEditor';

interface CreateNoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: NoteCreateData) => Promise<void>; // Adjusted for creation
}

// Update Constants
const MAX_CONTENT_LENGTH = 1000; // Define the character limit

/** Stable reference so the editor's mount-time content never changes identity. */
const EMPTY_DOC = emptyRichTextDoc();

const CreateNoteModal: React.FC<CreateNoteModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');
  // The document is what gets saved; the plain text is only kept to drive the
  // character counter, since a limit on the JSON's size would be meaningless.
  const [contentDoc, setContentDoc] = useState<RichTextDoc>(emptyRichTextDoc);
  const [contentText, setContentText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contentLength = contentText.trim().length;

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setContentDoc(emptyRichTextDoc());
      setContentText('');
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleContentChange = (doc: RichTextDoc, plainText: string) => {
    setContentDoc(doc);
    setContentText(plainText);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || contentLength > MAX_CONTENT_LENGTH) return;

    if (!title.trim()) {
      toast.error('Title cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading('Creating note...', {
      duration: Infinity, // Keep loading toast visible indefinitely
    });

    const noteData: NoteCreateData = {
      title: title.trim(),
      // Only the document is sent — the backend derives the plain-text `content`
      // it embeds from it, so the two can never disagree.
      contentJson: contentDoc,
    };

    try {
      await onCreate(noteData);
      toast.success('Note created successfully!', { id: toastId, duration: 3000 });
      onClose();
    } catch (error: unknown) {
      console.error("Create note error in modal:", error);
      let errorMessage = 'Failed to create note.';
      if (error instanceof Error) {
          errorMessage = error.message;
      }
      toast.error(errorMessage, { id: toastId, duration: 3000 });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isOverLimit = contentLength > MAX_CONTENT_LENGTH;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center p-4 backdrop-blur-sm bg-black/10">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[85vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Create New Note</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            title="Close"
            aria-label="Close"
            className="shrink-0 p-1 rounded-md text-gray-400 hover:text-gray-600 focus:outline-none disabled:opacity-50"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="note-title" className="block text-sm font-medium text-gray-700 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter note title"
            />
          </div>
          <div className="mb-1"> {/* Reduce bottom margin */}
            <span className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </span>
            <RichTextEditor
              // A new note always starts blank, and the modal unmounts on close,
              // so the editor never needs to be reloaded in place.
              initialContent={EMPTY_DOC}
              onChange={handleContentChange}
              placeholder="Enter note content…"
              minHeight="14rem"
              disabled={isSubmitting}
              invalid={isOverLimit}
            />
          </div>
          {/* Character Counter */}
          <div className={clsx(
              "text-xs text-right mb-4",
              isOverLimit ? "text-red-600" : "text-gray-500"
              )}>
              {contentLength}/{MAX_CONTENT_LENGTH} {/* Use constant */} 
          </div>
          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || isOverLimit} // Disable if submitting OR the content limit is exceeded
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating...' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal; 