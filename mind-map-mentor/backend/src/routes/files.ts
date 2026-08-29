// File routes. Mirrors app/api/api_v1/endpoints/files.py.
import fs from 'fs';
import { Router } from 'express';
import multer from 'multer';

import * as crudFile from '../crud/file';
import { getCurrentActiveUser } from '../middleware/auth';
import { HttpError } from '../errors';
import { asyncHandler, parseIdParam } from '../http';
import { positionUpdateSchema } from '../schemas';
import { serializeFile, serializeGraphNode } from '../serializers';

const upload = multer({ storage: multer.memoryStorage() });

const router = Router();

router.use(getCurrentActiveUser);

// List (paginated { items, total }).
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const skip = Number(req.query.skip ?? 0);
    const limit = Number(req.query.limit ?? 100);
    const [files, total] = await crudFile.getFilesForUser(req.user!.id, skip, limit);
    res.json({ items: files.map(serializeFile), total });
  }),
);

// Upload (multipart, field name "file").
router.post(
  '/upload',
  upload.single('file'),
  asyncHandler(async (req, res) => {
    const file = req.file;
    if (!file || !file.originalname) {
      throw new HttpError(400, 'No filename provided');
    }

    let dbFile;
    try {
      dbFile = await crudFile.createFileRecord(
        { filename: file.originalname, mimeType: file.mimetype, size: file.size },
        req.user!.id,
        file.originalname,
      );
    } catch (err) {
      console.error('Error creating file record:', err);
      throw new HttpError(500, 'Failed to create file record in database');
    }

    // Write the bytes to the generated storage path.
    try {
      fs.writeFileSync(dbFile.storagePath, file.buffer);
    } catch (err) {
      console.error(`Error saving file ${file.originalname}:`, err);
      // Roll back the DB record if the write failed.
      try {
        await crudFile.deleteFileRecord(dbFile.id, req.user!.id);
      } catch (delErr) {
        console.error(`Failed to roll back file record ${dbFile.id}:`, delErr);
      }
      throw new HttpError(500, 'Failed to save file to storage');
    }

    // Index the file's text in the background so the upload response is not
    // held up by embedding calls.
    const createdFile = dbFile;
    const userId = req.user!.id;
    setImmediate(() => {
      void crudFile.indexFileContent(createdFile, file.buffer, userId);
    });

    res.status(201).json(serializeFile(createdFile));
  }),
);

// Metadata.
router.get(
  '/:fileId',
  asyncHandler(async (req, res) => {
    const fileId = parseIdParam(req.params.fileId, 'fileId');
    const file = await crudFile.getFile(fileId, req.user!.id);
    if (!file) throw new HttpError(404, 'File not found');
    res.json(serializeFile(file));
  }),
);

// Delete (record + physical file).
router.delete(
  '/:fileId',
  asyncHandler(async (req, res) => {
    const fileId = parseIdParam(req.params.fileId, 'fileId');
    const file = await crudFile.getFile(fileId, req.user!.id);
    if (!file) throw new HttpError(404, 'File not found');

    try {
      if (fs.existsSync(file.storagePath)) {
        fs.unlinkSync(file.storagePath);
      }
    } catch (err) {
      console.error(`Error deleting file from storage ${file.storagePath}:`, err);
    }

    await crudFile.deleteFileRecord(fileId, req.user!.id);
    res.status(204).send();
  }),
);

// Download.
router.get(
  '/:fileId/download',
  asyncHandler(async (req, res) => {
    const fileId = parseIdParam(req.params.fileId, 'fileId');
    const file = await crudFile.getFile(fileId, req.user!.id);
    if (!file) throw new HttpError(404, 'File metadata not found');
    if (!fs.existsSync(file.storagePath)) {
      throw new HttpError(404, 'File not found in storage');
    }
    if (file.mimeType) res.type(file.mimeType);
    res.download(file.storagePath, file.filename);
  }),
);

// Update node position for a file.
router.put(
  '/:fileId/position',
  asyncHandler(async (req, res) => {
    const fileId = parseIdParam(req.params.fileId, 'fileId');
    const body = positionUpdateSchema.parse(req.body);
    const node = await crudFile.updateFilePosition(
      fileId,
      body.position_x,
      body.position_y,
      req.user!.id,
    );
    if (!node) {
      throw new HttpError(404, 'File or associated graph node not found, or update failed');
    }
    res.json(serializeGraphNode(node));
  }),
);

export default router;
