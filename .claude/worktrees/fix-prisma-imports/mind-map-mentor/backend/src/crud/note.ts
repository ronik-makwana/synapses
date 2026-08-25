// Note CRUD + automatic graph linking. Mirrors app/crud/crud_note.py.
import type { Note, Prisma } from '../generated/prisma';

import { prisma } from '../db/client';
import { settings } from '../config';
import { suggestTagsForContent } from '../ai/organizer';
import { upsertDocument, deleteDocument, querySimilarNotes } from '../ai/vectorstore';
import * as crudGraph from './graph';

const SIMILARITY_THRESHOLD_SUMMARY = settings.SIMILARITY_THRESHOLD_SUMMARY;

export interface NoteCreateInput {
  title: string;
  content: string;
  userSummary?: string | null;
  positionX?: number | null;
  positionY?: number | null;
}

export interface NoteUpdateInput {
  title?: string | null;
  content?: string | null;
  userSummary?: string | null;
  tags?: string[] | null;
  positionX?: number | null;
  positionY?: number | null;
}

/** Map a similarity score to a descriptive relationship label. */
export function getRelationshipLabelFromScore(score: number): string {
  if (score >= 0.9) return 'Strongly Related';
  if (score >= 0.8) return 'Highly Related';
  if (score >= 0.7) return 'Related';
  if (score >= 0.6) return 'Moderately Related';
  if (score >= settings.SIMILARITY_THRESHOLD) return 'Weakly Related';
  return 'Related';
}

export async function getNote(noteId: number, userId: number): Promise<Note | null> {
  return prisma.note.findFirst({ where: { id: noteId, userId } });
}

export async function getNotesForUser(
  userId: number,
  skip = 0,
  limit = 100,
  search?: string,
): Promise<[Note[], number]> {
  const whereClause: Prisma.NoteWhereInput = { userId };

  if (search && search.trim()) {
    const searchTerm = search.trim();
    whereClause.OR = [
      { title: { contains: searchTerm, mode: 'insensitive' } },
      { content: { contains: searchTerm, mode: 'insensitive' } },
      { userSummary: { contains: searchTerm, mode: 'insensitive' } },
    ];
  }

  const [notes, total] = await Promise.all([
    prisma.note.findMany({
      where: whereClause,
      orderBy: { updatedAt: { sort: 'desc', nulls: 'last' } },
      skip,
      take: limit,
    }),
    prisma.note.count({ where: whereClause }),
  ]);
  return [notes, total];
}

/** Find notes with similar summaries and create edges above the threshold. */
async function findAndCreateSimilarNoteEdges(
  note: Note,
  userId: number,
  threshold: number,
): Promise<void> {
  if (!note.userSummary || !note.userSummary.trim()) return;
  if (note.graphNodeId == null) return;

  try {
    const results = await querySimilarNotes({
      queryText: note.userSummary,
      userId,
      embeddingTypeFilter: 'summary',
      topK: 6,
    });

    for (const result of results) {
      const score = result.score;
      const similarNoteId = result.metadata.note_id as number | undefined;
      if (score == null || similarNoteId == null) continue;
      if (similarNoteId === note.id) continue;
      if (score < threshold) continue;

      const similarNote = await getNote(similarNoteId, userId);
      if (!similarNote || similarNote.graphNodeId == null) continue;

      const label = getRelationshipLabelFromScore(score);
      await crudGraph.createGraphEdge(
        {
          sourceNodeId: note.graphNodeId,
          targetNodeId: similarNote.graphNodeId,
          label,
          data: { similarity_score: score, based_on: 'summary' },
        },
        userId,
      );
    }
  } catch (err) {
    console.error(`Error during automatic edge creation for note ${note.id}:`, err);
  }
}

export async function createNote(input: NoteCreateInput, userId: number): Promise<Note> {
  const x = input.positionX ?? 0.0;
  const y = input.positionY ?? 0.0;

  // 1. Create the graph node and note atomically, then link them.
  const note = await prisma.$transaction(async (tx) => {
    const node = await tx.graphNode.create({
      data: {
        userId,
        label: input.title ?? 'Untitled Note',
        nodeType: 'note',
        position: { x, y },
        data: { original_note_id: null, content: input.content } as Prisma.InputJsonValue,
      },
    });
    const created = await tx.note.create({
      data: {
        userId,
        title: input.title,
        content: input.content,
        userSummary: input.userSummary ?? null,
        positionX: x,
        positionY: y,
        graphNodeId: node.id,
      },
    });
    await tx.graphNode.update({
      where: { id: node.id },
      data: { data: { original_note_id: created.id, content: input.content } as Prisma.InputJsonValue },
    });
    return created;
  });

  // 2. Post-commit best-effort work runs in background (don't await to keep API fast)
  setImmediate(async () => {
    // Find and create similar note edges
    if (note.userSummary) {
      try {
        await findAndCreateSimilarNoteEdges(note, userId, SIMILARITY_THRESHOLD_SUMMARY);
      } catch (err) {
        console.error(`Failed to create similar note edges for note ${note.id}:`, err);
      }
    }

    // Generate AI tags
    let tags: string[] = [];
    try {
      tags = await suggestTagsForContent(note.content);
      if (note.graphNodeId != null) {
        await crudGraph.updateGraphNodeTags(note.graphNodeId, tags, userId);
      }
    } catch (err) {
      console.error(`Failed to generate/store AI tags for note ${note.id}:`, err);
    }

    // Upsert to vector store
    try {
      await upsertDocument(
        note.id,
        note.content || '',
        { note_id: note.id, user_id: userId, title: note.title, type: 'note', tags },
        note.userSummary,
      );
    } catch (err) {
      console.error(`Failed to submit note ${note.id} for embedding/upsert:`, err);
    }
  });

  return note;
}

export async function updateNote(
  noteId: number,
  update: NoteUpdateInput,
  userId: number,
): Promise<Note | null> {
  const existing = await getNote(noteId, userId);
  if (!existing) return null;

  const contentUpdated = update.content !== undefined && update.content !== existing.content;
  const summaryUpdated =
    update.userSummary !== undefined && update.userSummary !== existing.userSummary;
  const manualTagsProvided = update.tags !== undefined;
  const manualTags = manualTagsProvided ? update.tags ?? [] : null;

  const positionUpdated =
    (update.positionX !== undefined && update.positionX !== existing.positionX) ||
    (update.positionY !== undefined && update.positionY !== existing.positionY);

  // 1. Apply note-field updates.
  const noteData: Prisma.NoteUpdateInput = { updatedAt: new Date() };
  if (update.title !== undefined) noteData.title = update.title;
  if (update.content !== undefined && update.content !== null) noteData.content = update.content;
  if (update.userSummary !== undefined) noteData.userSummary = update.userSummary;
  if (update.positionX !== undefined) noteData.positionX = update.positionX;
  if (update.positionY !== undefined) noteData.positionY = update.positionY;

  const note = await prisma.note.update({ where: { id: noteId }, data: noteData });

  // 2. Sync the linked graph node (label, position, data.content, manual tags).
  if (note.graphNodeId != null) {
    const node = await crudGraph.getGraphNode(note.graphNodeId, userId);
    if (node) {
      const nodeData: Prisma.GraphNodeUpdateInput = { updatedAt: new Date() };
      const currentData = (node.data as Record<string, unknown> | null) ?? {};
      const nextData: Record<string, unknown> = { ...currentData };
      let dataChanged = false;

      if (update.title !== undefined && update.title !== node.label) {
        nodeData.label = update.title;
      }
      if (contentUpdated) {
        nextData.content = note.content;
        dataChanged = true;
      }
      if (manualTagsProvided) {
        nextData.tags = manualTags;
        dataChanged = true;
      }
      if (dataChanged) nodeData.data = nextData as Prisma.InputJsonValue;
      if (positionUpdated) {
        nodeData.position = { x: note.positionX ?? 0.0, y: note.positionY ?? 0.0 };
      }
      await prisma.graphNode.update({ where: { id: node.id }, data: nodeData });
    }
  }

  // 3. Conditional AI tag regeneration (content changed & no manual tags).
  let aiGeneratedTags: string[] = [];
  if (contentUpdated && !manualTagsProvided) {
    try {
      aiGeneratedTags = await suggestTagsForContent(note.content);
      if (note.graphNodeId != null) {
        await crudGraph.updateGraphNodeTags(note.graphNodeId, aiGeneratedTags, userId);
      }
    } catch (err) {
      console.error(`Failed to regenerate AI tags for note ${noteId}:`, err);
    }
  }

  // 4. Re-upsert vectors if content or summary changed.
  if (contentUpdated || summaryUpdated) {
    try {
      await upsertDocument(
        note.id,
        note.content || '',
        {
          note_id: note.id,
          user_id: userId,
          title: note.title,
          type: 'note',
          tags: manualTagsProvided ? manualTags : aiGeneratedTags,
        },
        note.userSummary,
      );
    } catch (err) {
      console.error(`Failed to re-upsert note ${note.id}:`, err);
    }
  }

  // 5. Re-run edge linking if the summary changed.
  if (summaryUpdated) {
    await findAndCreateSimilarNoteEdges(note, userId, SIMILARITY_THRESHOLD_SUMMARY);
  }

  return note;
}

export async function deleteNote(noteId: number, userId: number): Promise<Note | null> {
  const note = await getNote(noteId, userId);
  if (!note) return null;

  const gnId = note.graphNodeId;
  await prisma.$transaction(async (tx) => {
    if (gnId != null) {
      await tx.graphEdge.deleteMany({
        where: { OR: [{ sourceNodeId: gnId }, { targetNodeId: gnId }] },
      });
    }
    await tx.note.delete({ where: { id: noteId } });
    if (gnId != null) {
      await tx.graphNode.delete({ where: { id: gnId } });
    }
  });

  // Best-effort vector deletion.
  await deleteDocument(noteId);

  return note;
}
