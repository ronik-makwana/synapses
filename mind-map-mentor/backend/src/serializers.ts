// Response serializers — convert Prisma rows into the exact JSON shapes the
// existing frontend reads (snake_case fields, nested `data`, ISO date strings,
// and the computed position_x/position_y on graph nodes).
import type { User, Note, File, GraphNode, GraphEdge } from '../generated/prisma';

function iso(d: Date | null | undefined): string | null {
  return d ? d.toISOString() : null;
}

export function serializeUser(u: User) {
  return {
    id: u.id,
    email: u.email,
    full_name: u.fullName,
    is_active: u.isActive,
    created_at: iso(u.createdAt),
  };
}

/** A note's tags live on its linked graph node's `data` JSON, not on the note
 *  row, so the node has to be joined in for them to be serialized. */
function tagsFromNodeData(data: unknown): string[] {
  if (!data || typeof data !== 'object') return [];
  const tags = (data as Record<string, unknown>).tags;
  if (!Array.isArray(tags)) return [];
  return tags.filter((tag): tag is string => typeof tag === 'string');
}

export function serializeNote(n: Note & { graphNode?: { data: unknown } | null }) {
  return {
    id: n.id,
    user_id: n.userId,
    title: n.title,
    content: n.content,
    userSummary: n.userSummary ?? null,
    // [] when the caller did not join the node, or before the background tag
    // pass has run — never absent, so the client can rely on the field.
    tags: tagsFromNodeData(n.graphNode?.data),
    position_x: n.positionX ?? 0.0,
    position_y: n.positionY ?? 0.0,
    graph_node_id: n.graphNodeId ?? null,
    created_at: iso(n.createdAt),
    updated_at: iso(n.updatedAt),
  };
}

export function serializeFile(f: File) {
  return {
    id: f.id,
    user_id: f.userId,
    filename: f.filename,
    mime_type: f.mimeType ?? null,
    size: f.size != null ? Number(f.size) : null,
    graph_node_id: f.graphNodeId ?? null,
    created_at: iso(f.createdAt),
  };
}

function positionCoords(position: unknown): { x: number | null; y: number | null } {
  if (position && typeof position === 'object') {
    const p = position as Record<string, unknown>;
    const x = p.x != null ? Number(p.x) : null;
    const y = p.y != null ? Number(p.y) : null;
    return {
      x: Number.isFinite(x as number) ? (x as number) : null,
      y: Number.isFinite(y as number) ? (y as number) : null,
    };
  }
  return { x: null, y: null };
}

export function serializeGraphNode(node: GraphNode) {
  const { x, y } = positionCoords(node.position);
  return {
    id: node.id,
    user_id: node.userId,
    label: node.label,
    node_type: node.nodeType,
    data: node.data ?? null,
    position: node.position ?? null,
    created_at: iso(node.createdAt),
    updated_at: iso(node.updatedAt),
    // Computed fields matching schemas/graph.py's GraphNode.
    position_x: x,
    position_y: y,
  };
}

export function serializeGraphEdge(edge: GraphEdge) {
  return {
    id: edge.id,
    user_id: edge.userId,
    source_node_id: edge.sourceNodeId,
    target_node_id: edge.targetNodeId,
    relationship_type: edge.relationshipType ?? null,
    label: edge.label ?? null,
    data: edge.data ?? null,
    created_at: iso(edge.createdAt),
    updated_at: iso(edge.updatedAt),
  };
}
