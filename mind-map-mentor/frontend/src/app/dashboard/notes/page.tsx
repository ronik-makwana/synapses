'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Note } from '@/types';
import { fetchNotes, deleteNote, updateNote, createNote } from '@/services/api';
import { FiChevronLeft, FiChevronRight, FiEdit, FiTrash2, FiSearch, FiPlus } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useGraphStore } from '@/store/graphStore';
import EditNoteModal from '@/components/notes/EditNoteModal';
import CreateNoteModal from '@/components/notes/CreateNoteModal';
import { NoteCreateData } from '@/types';

const ITEMS_PER_PAGE = 10;
const SEARCH_DEBOUNCE_MS = 300;

export default function AllNotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalNotes, setTotalNotes] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState<number | null>(null);

  const searchTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const lastNoteCreatedTimestamp = useGraphStore((state) => state.lastNoteCreatedTimestamp);

  const totalPages = Math.ceil(totalNotes / ITEMS_PER_PAGE);
  const hasNotes = totalNotes > 0;
  const showPagination = totalPages > 1;

  // Debounce search
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
      setCurrentPage(1); // Reset to page 1 on search change
    }, SEARCH_DEBOUNCE_MS);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  // Load notes with search and pagination
  const loadNotes = useCallback(async (page: number, search: string = '') => {
    setIsLoading(true);
    setIsSearching(search.length > 0);
    setError(null);
    try {
      const skip = (page - 1) * ITEMS_PER_PAGE;
      const limit = ITEMS_PER_PAGE;

      // Fetch notes with search
      const response = await fetchNotes(skip, limit, search);

      setNotes(response.items);
      setTotalNotes(response.total);

      // Adjust page if needed
      if (response.items.length === 0 && page > 1) {
        setCurrentPage(page - 1);
      }
    } catch (err) {
      console.error('Failed to load notes:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to load notes.';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
      setIsSearching(false);
    }
  }, []);

  // Load notes when page or search changes
  useEffect(() => {
    loadNotes(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery, loadNotes]);

  // Reload when new note is created
  useEffect(() => {
    if (lastNoteCreatedTimestamp) {
      loadNotes(1, debouncedSearchQuery);
    }
  }, [lastNoteCreatedTimestamp, loadNotes, debouncedSearchQuery]);

  // Handlers
  const openEditModal = (note: Note) => {
    setEditingNote(note);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingNote(null);
  };

  const handleUpdateSuccess = () => {
    closeEditModal();
    loadNotes(currentPage, debouncedSearchQuery);
    toast.success('Note updated successfully!');
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      return;
    }

    setIsDeletingId(noteId);
    const toastId = toast.loading('Deleting note...');
    try {
      await deleteNote(noteId);
      toast.success('Note deleted successfully!', { id: toastId });
      loadNotes(currentPage, debouncedSearchQuery);
    } catch (err) {
      console.error('Failed to delete note:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete note.';
      toast.error(errorMessage, { id: toastId });
    } finally {
      setIsDeletingId(null);
    }
  };

  const handleCreateNote = async (data: NoteCreateData) => {
    try {
      // Create the note (fast API call)
      await createNote(data);

      // Now load notes and link them
      await loadNotes(1, debouncedSearchQuery);

      // Close modal after everything is done
      setIsCreateModalOpen(false);
    } catch (error: unknown) {
      console.error('Failed to create note:', error);
      throw error;
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const truncateText = (text: string | null | undefined, maxLength: number = 50): string => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  // Empty state
  if (!isLoading && !error && !hasNotes) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">You don&apos;t have any notes yet</h1>
          <p className="text-gray-600 mb-6">Create your first note to get started.</p>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2 h-5 w-5" />
            Add Note
          </button>
        </div>

        {isCreateModalOpen && (
          <CreateNoteModal
            isOpen={isCreateModalOpen}
            onClose={() => setIsCreateModalOpen(false)}
            onCreate={handleCreateNote}
          />
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex-shrink-0 px-6 py-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">All Notes</h1>
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <FiPlus className="mr-2 h-4 w-4" />
            Add Note
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="🔍 Search notes..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-400 focus:outline-none focus:placeholder-gray-500 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading notes...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={() => loadNotes(currentPage, debouncedSearchQuery)}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {/* No Search Results */}
      {!isLoading && !error && hasNotes && notes.length === 0 && searchQuery && (
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600 mb-4">No notes found matching your search.</p>
            <button
              onClick={clearSearch}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Clear Search
            </button>
          </div>
        </div>
      )}

      {/* Notes Table */}
      {!isLoading && !error && notes.length > 0 && (
        <div className="flex-1 overflow-auto px-6">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-300">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {notes.map((note) => (
                <tr key={note.id} className="border-b border-gray-300 hover:bg-gray-50 transition-colors last:border-b-0">
                  <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate" title={note.title}>
                    {note.title || 'Untitled'}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-md truncate" title={note.content || ''}>
                    {truncateText(note.content)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                    {formatDate(note.created_at)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium space-x-3">
                    <button
                      onClick={() => openEditModal(note)}
                      className="text-indigo-600 hover:text-indigo-900 inline-flex items-center"
                      title="Edit Note"
                    >
                      <FiEdit className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteNote(note.id)}
                      disabled={isDeletingId === note.id}
                      className="text-red-600 hover:text-red-900 inline-flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
                      title="Delete Note"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      {!isLoading && !error && showPagination && (
        <div className="flex-shrink-0 px-6 py-4 border-t border-gray-200 flex justify-center items-center space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1 || isSearching}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Previous page"
          >
            <FiChevronLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-gray-600 min-w-[60px] text-center">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages || isSearching}
            className="p-2 rounded-md text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-indigo-500"
            title="Next page"
          >
            <FiChevronRight className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Modals */}
      {isCreateModalOpen && (
        <CreateNoteModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onCreate={handleCreateNote}
        />
      )}

      {isEditModalOpen && editingNote && (
        <EditNoteModal
          note={editingNote}
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onUpdate={async (noteId, updatedData) => {
            await updateNote(noteId, updatedData);
            handleUpdateSuccess();
          }}
        />
      )}
    </div>
  );
}
