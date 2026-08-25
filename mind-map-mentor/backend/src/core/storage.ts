// File-storage helpers. Mirrors app/core/storage.py.
import { randomUUID } from 'crypto';
import fs from 'fs';
import path from 'path';

import { settings } from '../config';

/** Ensure the configured storage directory exists (called on startup). */
export function ensureStoragePathExists(): void {
  const storagePath = settings.FILE_STORAGE_PATH;
  try {
    if (!fs.existsSync(storagePath)) {
      console.log(`Storage path '${storagePath}' does not exist. Creating it.`);
      fs.mkdirSync(storagePath, { recursive: true });
      console.log(`Storage path '${storagePath}' created successfully.`);
    }
  } catch (err) {
    console.error(`Error creating storage path '${storagePath}':`, err);
    throw err;
  }
}

/**
 * Build the absolute on-disk storage path for a new upload:
 * `<FILE_STORAGE_PATH>/<uuid><ext>` resolved to an absolute path.
 * Matches crud_file.create_file_record in the Python backend.
 */
export function buildStoragePath(originalFilename: string): { uniqueFilename: string; absolutePath: string } {
  const ext = path.extname(originalFilename || '');
  const uniqueFilename = `${randomUUID()}${ext}`;
  const absolutePath = path.resolve(settings.FILE_STORAGE_PATH, uniqueFilename);
  return { uniqueFilename, absolutePath };
}
