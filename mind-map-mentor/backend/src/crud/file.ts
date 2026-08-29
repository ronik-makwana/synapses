// File CRUD. Mirrors app/crud/crud_file.py.
import type { File, GraphNode, Prisma } from '../../generated/prisma';

import { prisma } from '../db/client';
import { buildStoragePath } from '../core/storage';
import { extractText } from '../core/extraction';
import { upsertFileDocument, deleteFileDocument } from '../ai/vectorstore';
import * as crudGraph from './graph';

export interface FileMeta {
  filename: string;
  mimeType?: string | null;
  size?: number | null;
}

/**
 * Create a File record plus its 'file' GraphNode, and generate the on-disk
 * storage path. The route writes the bytes to `file.storagePath` afterwards.
 */
export async function createFileRecord(
  meta: FileMeta,
  userId: number,
  originalFilename: string,
): Promise<File> {
  const { absolutePath } = buildStoragePath(originalFilename);
  const sizeBig = meta.size != null ? BigInt(Math.trunc(meta.size)) : null;

  return prisma.$transaction(async (tx) => {
    const node = await tx.graphNode.create({
      data: {
        userId,
        label: originalFilename,
        nodeType: 'file',
        position: { x: 0.0, y: 0.0 },
        data: {} as Prisma.InputJsonValue,
      },
    });
    const file = await tx.file.create({
      data: {
        userId,
        filename: originalFilename,
        mimeType: meta.mimeType ?? null,
        size: sizeBig,
        storagePath: absolutePath,
        graphNodeId: node.id,
      },
    });
    await tx.graphNode.update({
      where: { id: node.id },
      data: {
        data: {
          original_file_id: file.id,
          mime_type: meta.mimeType ?? null,
          size: meta.size ?? null,
        } as Prisma.InputJsonValue,
      },
    });
    return file;
  });
}

/**
 * Extract an uploaded file's text and index it so files are reachable by
 * semantic search and RAG, not just visible as graph nodes.
 *
 * Best-effort: an un-indexable format (PDF, image, Office document) or an
 * embedding failure must not fail the upload. Returns the number of chunks
 * written, or 0 when nothing was indexed.
 */
export async function indexFileContent(
  file: File,
  buffer: Buffer,
  userId: number,
): Promise<number> {
  const text = extractText(buffer, file.mimeType, file.filename);
  if (!text) {
    console.info(
      `[vectorstore] File ${file.id} (${file.mimeType ?? 'unknown type'}) has no extractable ` +
        'text; it stays in the graph but is not semantically searchable.',
    );
    return 0;
  }

  try {
    return await upsertFileDocument(file.id, text, {
      file_id: file.id,
      user_id: userId,
      title: file.filename,
      type: 'file',
      mime_type: file.mimeType,
    });
  } catch (err) {
    console.error(
      `[vectorstore] File ${file.id} could not be indexed. It will not appear in ` +
        'semantic search or RAG answers.',
      err,
    );
    return 0;
  }
}

export async function getFile(fileId: number, userId: number): Promise<File | null> {
  return prisma.file.findFirst({ where: { id: fileId, userId } });
}

export async function getFilesForUser(
  userId: number,
  skip = 0,
  limit = 100,
): Promise<[File[], number]> {
  const [files, total] = await Promise.all([
    prisma.file.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
    }),
    prisma.file.count({ where: { userId } }),
  ]);
  return [files, total];
}

export async function deleteFileRecord(fileId: number, userId: number): Promise<File | null> {
  const file = await getFile(fileId, userId);
  if (!file) return null;
  const gnId = file.graphNodeId;
  await prisma.file.delete({ where: { id: fileId } });
  if (gnId != null) {
    await crudGraph.deleteGraphNode(gnId, userId);
  }

  // Best-effort: the row is already gone, so a failure here leaves orphaned
  // vectors rather than blocking the delete.
  try {
    await deleteFileDocument(fileId);
  } catch (err) {
    console.error(`[vectorstore] Failed to delete vectors for file ${fileId}:`, err);
  }

  return file;
}

export async function updateFilePosition(
  fileId: number,
  positionX: number,
  positionY: number,
  userId: number,
): Promise<GraphNode | null> {
  const file = await getFile(fileId, userId);
  if (!file || file.graphNodeId == null) return null;
  return crudGraph.updateGraphNode(
    file.graphNodeId,
    { position: { x: positionX, y: positionY } },
    userId,
  );
}
