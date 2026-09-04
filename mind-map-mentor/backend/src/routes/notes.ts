// Note routes. Mirrors app/api/api_v1/endpoints/notes.py.
import { Router } from 'express';

import * as crudNote from '../crud/note';
import { getCurrentActiveUser } from '../middleware/auth';
import { HttpError } from '../errors';
import { asyncHandler, parseIdParam } from '../http';
import { noteCreateSchema, noteUpdateSchema } from '../schemas';
import { serializeNote } from '../serializers';

const router = Router();

router.use(getCurrentActiveUser);

// List (paginated { items, total }).
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const skip = Number(req.query.skip ?? 0);
    const limit = Number(req.query.limit ?? 100);
    const search = String(req.query.search ?? '');
    const [notes, total] = await crudNote.getNotesForUser(req.user!.id, skip, limit, search);
    res.json({ items: notes.map(serializeNote), total });
  }),
);

// Create.
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = noteCreateSchema.parse(req.body);
    const note = await crudNote.createNote(
      {
        title: body.title,
        content: body.content,
        contentJson: body.contentJson,
        userSummary: body.userSummary ?? null,
        positionX: body.position_x ?? undefined,
        positionY: body.position_y ?? undefined,
      },
      req.user!.id,
    );
    res.status(201).json(serializeNote(note));
  }),
);

// Get one.
router.get(
  '/:noteId',
  asyncHandler(async (req, res) => {
    const noteId = parseIdParam(req.params.noteId, 'noteId');
    const note = await crudNote.getNote(noteId, req.user!.id);
    if (!note) throw new HttpError(404, 'Note not found');
    res.json(serializeNote(note));
  }),
);

// Update.
router.put(
  '/:noteId',
  asyncHandler(async (req, res) => {
    const noteId = parseIdParam(req.params.noteId, 'noteId');
    const body = noteUpdateSchema.parse(req.body);
    const note = await crudNote.updateNote(
      noteId,
      {
        title: body.title ?? undefined,
        content: body.content ?? undefined,
        contentJson: body.contentJson ?? undefined,
        userSummary: body.userSummary,
        tags: body.tags ?? undefined,
        positionX: body.position_x ?? undefined,
        positionY: body.position_y ?? undefined,
      },
      req.user!.id,
    );
    if (!note) throw new HttpError(404, 'Note not found');
    res.json(serializeNote(note));
  }),
);

// Delete.
router.delete(
  '/:noteId',
  asyncHandler(async (req, res) => {
    const noteId = parseIdParam(req.params.noteId, 'noteId');
    const note = await crudNote.deleteNote(noteId, req.user!.id);
    if (!note) throw new HttpError(404, 'Note not found');
    res.status(204).send();
  }),
);

export default router;
