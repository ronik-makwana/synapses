// Graph node & edge CRUD. Mirrors app/crud/crud_graph.py.
import type { GraphNode, GraphEdge, Prisma } from '../../generated/prisma';

import { prisma } from '../db/client';

// --- Graph nodes ---

export interface GraphNodeCreateInput {
  label: string;
  nodeType?: string;
  data?: Record<string, unknown> | null;
  positionX?: number | null;
  positionY?: number | null;
}

export interface GraphNodeUpdateInput {
  label?: string | null;
  nodeType?: string | null;
  data?: Record<string, unknown> | null;
  position?: { x?: number | null; y?: number | null } | null;
  positionX?: number | null;
  positionY?: number | null;
}

export async function getGraphNode(nodeId: number, userId: number): Promise<GraphNode | null> {
  return prisma.graphNode.findFirst({ where: { id: nodeId, userId } });
}

export async function getGraphNodesForUser(
  userId: number,
  skip = 0,
  limit = 100,
): Promise<GraphNode[]> {
  return prisma.graphNode.findMany({ where: { userId }, skip, take: limit });
}

function coordOrDefault(value: unknown, fallback = 0.0): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

export async function createGraphNode(
  input: GraphNodeCreateInput,
  userId: number,
): Promise<GraphNode> {
  let x = 0.0;
  let y = 0.0;
  if (input.positionX != null && input.positionY != null) {
    x = coordOrDefault(input.positionX);
    y = coordOrDefault(input.positionY);
  }
  return prisma.graphNode.create({
    data: {
      userId,
      label: input.label,
      nodeType: input.nodeType ?? 'note',
      data: (input.data ?? undefined) as Prisma.InputJsonValue | undefined,
      position: { x, y },
    },
  });
}

export async function updateGraphNode(
  nodeId: number,
  update: GraphNodeUpdateInput,
  userId: number,
): Promise<GraphNode | null> {
  const node = await getGraphNode(nodeId, userId);
  if (!node) return null;

  const currentPos = (node.position as { x?: number; y?: number } | null) ?? {};
  let newPos = { x: coordOrDefault(currentPos.x), y: coordOrDefault(currentPos.y) };

  if (update.positionX !== undefined || update.positionY !== undefined) {
    newPos = {
      x: update.positionX !== undefined ? coordOrDefault(update.positionX) : newPos.x,
      y: update.positionY !== undefined ? coordOrDefault(update.positionY) : newPos.y,
    };
  } else if (update.position !== undefined) {
    const p = update.position ?? {};
    newPos = { x: coordOrDefault(p.x), y: coordOrDefault(p.y) };
  }

  const data: Prisma.GraphNodeUpdateInput = {
    position: newPos,
    updatedAt: new Date(),
  };
  if (update.label !== undefined && update.label !== null) data.label = update.label;
  if (update.nodeType !== undefined && update.nodeType !== null) data.nodeType = update.nodeType;
  if (update.data !== undefined) data.data = (update.data ?? undefined) as Prisma.InputJsonValue | undefined;

  return prisma.graphNode.update({ where: { id: nodeId }, data });
}

export async function updateGraphNodeTags(
  nodeId: number,
  tags: string[],
  userId: number,
): Promise<GraphNode | null> {
  const node = await getGraphNode(nodeId, userId);
  if (!node) return null;
  const currentData = (node.data as Record<string, unknown> | null) ?? {};
  const nextData = { ...currentData, tags };
  return prisma.graphNode.update({
    where: { id: nodeId },
    data: { data: nextData as Prisma.InputJsonValue, updatedAt: new Date() },
  });
}

export async function deleteGraphNode(nodeId: number, userId: number): Promise<GraphNode | null> {
  const node = await getGraphNode(nodeId, userId);
  if (!node) return null;
  // Remove connected edges and clear references before deleting the node
  // (application-level cascade, matching the Python ORM behavior).
  await prisma.$transaction([
    prisma.graphEdge.deleteMany({
      where: { OR: [{ sourceNodeId: nodeId }, { targetNodeId: nodeId }] },
    }),
    prisma.note.updateMany({ where: { graphNodeId: nodeId }, data: { graphNodeId: null } }),
    prisma.file.updateMany({ where: { graphNodeId: nodeId }, data: { graphNodeId: null } }),
    prisma.graphNode.delete({ where: { id: nodeId } }),
  ]);
  return node;
}

// --- Graph edges ---

export interface GraphEdgeCreateInput {
  sourceNodeId: number;
  targetNodeId: number;
  relationshipType?: string | null;
  label?: string | null;
  data?: Record<string, unknown> | null;
}

export interface GraphEdgeUpdateInput {
  sourceNodeId?: number | null;
  targetNodeId?: number | null;
  relationshipType?: string | null;
  label?: string | null;
  data?: Record<string, unknown> | null;
}

export async function getGraphEdge(edgeId: number, userId: number): Promise<GraphEdge | null> {
  const edge = await prisma.graphEdge.findFirst({
    where: {
      id: edgeId,
      OR: [{ sourceNode: { userId } }, { targetNode: { userId } }],
    },
  });
  return edge;
}

export async function getGraphEdgesForUser(
  userId: number,
  skip = 0,
  limit = 1000,
): Promise<GraphEdge[]> {
  return prisma.graphEdge.findMany({
    where: { sourceNode: { userId } },
    skip,
    take: limit,
  });
}

export async function createGraphEdge(
  input: GraphEdgeCreateInput,
  userId: number,
): Promise<GraphEdge | null> {
  const source = await getGraphNode(input.sourceNodeId, userId);
  if (!source) return null;
  const target = await getGraphNode(input.targetNodeId, userId);
  if (!target) return null;

  return prisma.graphEdge.create({
    data: {
      userId,
      sourceNodeId: input.sourceNodeId,
      targetNodeId: input.targetNodeId,
      relationshipType: input.relationshipType ?? undefined,
      label: input.label ?? undefined,
      data: (input.data ?? undefined) as Prisma.InputJsonValue | undefined,
    },
  });
}

export async function updateGraphEdge(
  edgeId: number,
  update: GraphEdgeUpdateInput,
  userId: number,
): Promise<GraphEdge | null> {
  const edge = await getGraphEdge(edgeId, userId);
  if (!edge) return null;

  if (update.sourceNodeId != null && !(await getGraphNode(update.sourceNodeId, userId))) {
    return null;
  }
  if (update.targetNodeId != null && !(await getGraphNode(update.targetNodeId, userId))) {
    return null;
  }

  const data: Prisma.GraphEdgeUpdateInput = { updatedAt: new Date() };
  if (update.sourceNodeId !== undefined && update.sourceNodeId !== null)
    data.sourceNode = { connect: { id: update.sourceNodeId } };
  if (update.targetNodeId !== undefined && update.targetNodeId !== null)
    data.targetNode = { connect: { id: update.targetNodeId } };
  if (update.relationshipType !== undefined) data.relationshipType = update.relationshipType;
  if (update.label !== undefined) data.label = update.label;
  if (update.data !== undefined) data.data = (update.data ?? undefined) as Prisma.InputJsonValue | undefined;

  return prisma.graphEdge.update({ where: { id: edgeId }, data });
}

export async function deleteGraphEdge(edgeId: number, userId: number): Promise<GraphEdge | null> {
  const edge = await getGraphEdge(edgeId, userId);
  if (!edge) return null;
  await prisma.graphEdge.delete({ where: { id: edgeId } });
  return edge;
}
