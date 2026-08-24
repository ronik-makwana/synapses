// File CRUD. Mirrors app/crud/crud_file.py.
import type { File, GraphNode, Prisma } from '../generated/prisma';

import { prisma } from '../db/client';
import { buildStoragePath } from '../core/storage';
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
