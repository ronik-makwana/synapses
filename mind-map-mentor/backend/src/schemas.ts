// Zod request schemas (Pydantic equivalents). Note the `userSummary` camelCase
// key on note bodies — matches what the frontend sends.
import { z } from 'zod';

export const userCreateSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  fullName: z.string().min(1, 'Full name is required'),
});

export const noteCreateSchema = z.object({
  title: z.string(),
  content: z.string(),
  userSummary: z.string().max(300).nullish(),
  position_x: z.number().nullish(),
  position_y: z.number().nullish(),
});

export const noteUpdateSchema = z.object({
  title: z.string().nullish(),
  content: z.string().nullish(),
  userSummary: z.string().max(300).nullish(),
  tags: z.array(z.string()).nullish(),
  position_x: z.number().nullish(),
  position_y: z.number().nullish(),
});

const positionSchema = z.object({ x: z.number().nullish(), y: z.number().nullish() });

export const graphNodeCreateSchema = z.object({
  label: z.string(),
  node_type: z.string().default('note'),
  data: z.record(z.any()).nullish(),
  position_x: z.number().nullish(),
  position_y: z.number().nullish(),
});

export const graphNodeUpdateSchema = z.object({
  label: z.string().nullish(),
  node_type: z.string().nullish(),
  data: z.record(z.any()).nullish(),
  position: positionSchema.nullish(),
  position_x: z.number().nullish(),
  position_y: z.number().nullish(),
});

export const graphEdgeCreateSchema = z.object({
  source_node_id: z.number(),
  target_node_id: z.number(),
  relationship_type: z.string().nullish(),
  label: z.string().nullish(),
  data: z.record(z.any()).nullish(),
});

export const graphEdgeUpdateSchema = z.object({
  source_node_id: z.number().nullish(),
  target_node_id: z.number().nullish(),
  relationship_type: z.string().nullish(),
  label: z.string().nullish(),
  data: z.record(z.any()).nullish(),
});

export const ragQuerySchema = z.object({
  query: z.string(),
});

export const positionUpdateSchema = z.object({
  position_x: z.number(),
  position_y: z.number(),
});
