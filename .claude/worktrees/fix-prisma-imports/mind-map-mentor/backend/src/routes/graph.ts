// Graph routes. Mirrors app/api/api_v1/endpoints/graph.py.
import { Router } from 'express';

import * as crudGraph from '../crud/graph';
import { getCurrentActiveUser } from '../middleware/auth';
import { HttpError } from '../errors';
import { asyncHandler, parseIdParam } from '../http';
import { graphNodeCreateSchema, graphNodeUpdateSchema, graphEdgeCreateSchema, graphEdgeUpdateSchema } from '../schemas';
import { serializeGraphNode, serializeGraphEdge } from '../serializers';

const router = Router();

router.use(getCurrentActiveUser);

// --- Nodes ---

router.get(
  '/nodes',
  asyncHandler(async (req, res) => {
    const skip = Number(req.query.skip ?? 0);
    const limit = Number(req.query.limit ?? 1000);
    const nodes = await crudGraph.getGraphNodesForUser(req.user!.id, skip, limit);
    res.json(nodes.map(serializeGraphNode));
  }),
);

router.post(
  '/nodes',
  asyncHandler(async (req, res) => {
    const body = graphNodeCreateSchema.parse(req.body);
    const node = await crudGraph.createGraphNode(
      {
        label: body.label,
        nodeType: body.node_type,
        data: body.data ?? undefined,
        positionX: body.position_x ?? undefined,
        positionY: body.position_y ?? undefined,
      },
      req.user!.id,
    );
    res.status(201).json(serializeGraphNode(node));
  }),
);

router.get(
  '/nodes/:nodeId',
  asyncHandler(async (req, res) => {
    const nodeId = parseIdParam(req.params.nodeId, 'nodeId');
    const node = await crudGraph.getGraphNode(nodeId, req.user!.id);
    if (!node) throw new HttpError(404, 'Node not found');
    res.json(serializeGraphNode(node));
  }),
);

router.put(
  '/nodes/:nodeId',
  asyncHandler(async (req, res) => {
    const nodeId = parseIdParam(req.params.nodeId, 'nodeId');
    const body = graphNodeUpdateSchema.parse(req.body);
    const node = await crudGraph.updateGraphNode(
      nodeId,
      {
        label: body.label,
        nodeType: body.node_type,
        data: body.data ?? undefined,
        position: body.position ?? undefined,
        positionX: body.position_x,
        positionY: body.position_y,
      },
      req.user!.id,
    );
    if (!node) throw new HttpError(404, 'Node not found');
    res.json(serializeGraphNode(node));
  }),
);

router.delete(
  '/nodes/:nodeId',
  asyncHandler(async (req, res) => {
    const nodeId = parseIdParam(req.params.nodeId, 'nodeId');
    const node = await crudGraph.deleteGraphNode(nodeId, req.user!.id);
    if (!node) throw new HttpError(404, 'Node not found');
    res.status(204).send();
  }),
);

// --- Edges ---

router.get(
  '/edges',
  asyncHandler(async (req, res) => {
    const skip = Number(req.query.skip ?? 0);
    const limit = Number(req.query.limit ?? 1000);
    const edges = await crudGraph.getGraphEdgesForUser(req.user!.id, skip, limit);
    res.json(edges.map(serializeGraphEdge));
  }),
);

router.post(
  '/edges',
  asyncHandler(async (req, res) => {
    const body = graphEdgeCreateSchema.parse(req.body);
    const edge = await crudGraph.createGraphEdge(
      {
        sourceNodeId: body.source_node_id,
        targetNodeId: body.target_node_id,
        relationshipType: body.relationship_type,
        label: body.label,
        data: body.data ?? undefined,
      },
      req.user!.id,
    );
    if (!edge) {
      throw new HttpError(
        400,
        'Failed to create edge. Source or target node may not exist or belong to user.',
      );
    }
    res.status(201).json(serializeGraphEdge(edge));
  }),
);

router.get(
  '/edges/:edgeId',
  asyncHandler(async (req, res) => {
    const edgeId = parseIdParam(req.params.edgeId, 'edgeId');
    const edge = await crudGraph.getGraphEdge(edgeId, req.user!.id);
    if (!edge) throw new HttpError(404, 'Edge not found');
    res.json(serializeGraphEdge(edge));
  }),
);

router.put(
  '/edges/:edgeId',
  asyncHandler(async (req, res) => {
    const edgeId = parseIdParam(req.params.edgeId, 'edgeId');
    const body = graphEdgeUpdateSchema.parse(req.body);
    const edge = await crudGraph.updateGraphEdge(
      edgeId,
      {
        sourceNodeId: body.source_node_id,
        targetNodeId: body.target_node_id,
        relationshipType: body.relationship_type,
        label: body.label,
        data: body.data ?? undefined,
      },
      req.user!.id,
    );
    if (!edge) {
      throw new HttpError(404, 'Edge not found or update failed (invalid source/target node?)');
    }
    res.json(serializeGraphEdge(edge));
  }),
);

router.delete(
  '/edges/:edgeId',
  asyncHandler(async (req, res) => {
    const edgeId = parseIdParam(req.params.edgeId, 'edgeId');
    const edge = await crudGraph.deleteGraphEdge(edgeId, req.user!.id);
    if (!edge) throw new HttpError(404, 'Edge not found');
    res.status(204).send();
  }),
);

export default router;
