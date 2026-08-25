'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { updateNote, uploadFile } from '@/services/api';
import { Note, NoteUpdateData } from '@/types';
import { useAuthStore } from '@/store/authStore';
import { useGraphStore } from '@/store/graphStore';
import EditNoteModal from '@/components/notes/EditNoteModal';
import ChangePasswordModal from '@/components/auth/ChangePasswordModal';
import toast from 'react-hot-toast';
import {
  FiUpload,
  FiGrid,
  FiFileText,
  FiLock,
  FiLogOut,
} from 'react-icons/fi';

import UploadFileModal from '@/components/files/UploadFileModal';

const SidePanel: React.FC = () => {
  const pathname = usePathname();
  const {
    fetchGraphData,
    addFileNode,
  } = useGraphStore();

  const { user, logout } = useAuthStore();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isUploadFileModalOpen, setIsUploadFileModalOpen] = useState(false);
  const [isLoadingUploadFile, setIsLoadingUploadFile] = useState(false);

  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordModalOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [editingNote] = useState<Note | null>(null);

  const handleUpdateNote = async (noteId: number, data: NoteUpdateData) => {
    console.log('SidePanel: handleUpdateNote called', { noteId, data });
    const toastId = toast.loading('Updating note...');
    try {
      await updateNote(noteId, data);
      console.log('SidePanel: Note updated successfully via API');
      fetchGraphData();
      closeEditModal();
      toast.success('Note updated successfully!', { id: toastId });
    } catch (error: unknown) {
      console.error('SidePanel: Failed to update note:', error);
      const message = error instanceof Error ? error.message : 'Failed to update note';
      toast.error(message, { id: toastId });
    }
  };

  useEffect(() => {
    console.log('SidePanel: Calling fetchGraphData from store.');
    fetchGraphData();
  }, [fetchGraphData]);

  const openUploadFileModal = () => setIsUploadFileModalOpen(true);
  const closeUploadFileModal = () => setIsUploadFileModalOpen(false);

  const handleFileUploadSubmit = async (file: File) => {
    setIsLoadingUploadFile(true);
    try {
      const uploadedFileRecord = await uploadFile(file);
      addFileNode(uploadedFileRecord);
      closeUploadFileModal();
    } catch (err: unknown) {
      console.error('File upload error from SidePanel via modal:', err);
      throw err;
    } finally {
      setIsLoadingUploadFile(false);
    }
  };

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    logout();
  };

  const openChangePasswordModal = () => {
    setIsProfileMenuOpen(false);
    setIsChangePasswordModalOpen(true);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as HTMLElement)) {
        setIsProfileMenuOpen(false);
      }
    };

    if (isProfileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isProfileMenuOpen]);

  const getFirstLetter = (fullName: string | undefined): string => {
    if (!fullName) return '?';
    return fullName.trim().charAt(0).toUpperCase();
  };

  const isCanvasActive = pathname === '/dashboard';
  const isNotesActive = pathname === '/dashboard/notes';

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Top Section: App Logo and Navigation */}
      <div className="flex-shrink-0 p-4">
        {/* App Logo */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-indigo-600">Synapse</h1>
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          <Link
            href="/dashboard"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isCanvasActive
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}
          >
            <FiGrid className="mr-3 h-5 w-5 flex-shrink-0" />
            <span>Canvas</span>
          </Link>
          <Link
            href="/dashboard/notes"
            className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
              isNotesActive
                ? 'bg-indigo-100 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
            }`}
          >
            <FiFileText className="mr-3 h-5 w-5 flex-shrink-0" />
            <span>Notes</span>
          </Link>
          <button
            onClick={openUploadFileModal}
            className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-700 hover:text-indigo-600 hover:bg-gray-50`}
            disabled={isLoadingUploadFile}
          >
            <FiUpload className="mr-3 h-5 w-5 flex-shrink-0" />
            <span>Upload Files</span>
          </button>
        </nav>
      </div>

      {/* Middle Section: Action Buttons and Scrollable Content */}
      <div className="flex-1 overflow-hidden flex flex-col">

        {/* Scrollable Content Area (can be expanded for notes/files lists) */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Placeholder for scrollable content */}
        </div>
      </div>

      {/* Bottom Section: User Profile */}
      <div className="flex-shrink-0 p-4 border-t border-gray-200">
        <div ref={profileMenuRef} className="relative">
          <button
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="w-full flex items-center px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {getFirstLetter(user?.full_name)}
            </div>

            {/* User Info */}
            <div className="ml-3 flex-1 text-left min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{user?.full_name || 'User'}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {isProfileMenuOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-40">
              <button
                onClick={openChangePasswordModal}
                className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <FiLock className="mr-3 h-4 w-4" />
                Change Password
              </button>
              <button
                onClick={handleLogout}
                className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors border-t border-gray-200"
              >
                <FiLogOut className="mr-3 h-4 w-4" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {isUploadFileModalOpen && (
        <UploadFileModal
          isOpen={isUploadFileModalOpen}
          onClose={closeUploadFileModal}
          onUpload={handleFileUploadSubmit}
        />
      )}

      {isEditModalOpen && editingNote && (
        <EditNoteModal
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          note={editingNote}
          onUpdate={handleUpdateNote}
        />
      )}

      {isChangePasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isChangePasswordModalOpen}
          onClose={() => setIsChangePasswordModalOpen(false)}
        />
      )}
    </div>
  );
};

export default SidePanel;
