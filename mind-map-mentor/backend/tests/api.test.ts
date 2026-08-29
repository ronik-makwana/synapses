import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import request from 'supertest';

// Mock the AI layer so tests never touch OpenAI or Pinecone.
vi.mock('../src/ai/vectorstore', () => ({
  upsertDocument: vi.fn(async () => {}),
  deleteDocument: vi.fn(async () => {}),
  upsertFileDocument: vi.fn(async () => 0),
  deleteFileDocument: vi.fn(async () => {}),
  querySimilarNotes: vi.fn(async () => []),
  dedupeBySource: vi.fn((matches: unknown[]) => matches),
}));
vi.mock('../src/ai/organizer', () => ({
  suggestTagsForContent: vi.fn(async () => ['alpha', 'beta']),
}));
vi.mock('../src/ai/rag', () => ({
  generateRagAnswer: vi.fn(async () => ({ answer: 'mock answer', sources: [] })),
}));

import { createApp } from '../src/app';
import { prisma } from '../src/db/client';

const app = createApp();
const email = `test_${Date.now()}@example.com`;
const password = 'test-password-123';

let token = '';
let userId = 0;
let noteId = 0;
let graphNodeId = 0;

afterAll(async () => {
  // Clean up everything created by this user.
  if (userId) {
    await prisma.graphEdge.deleteMany({ where: { userId } });
    await prisma.note.deleteMany({ where: { userId } });
    await prisma.file.deleteMany({ where: { userId } });
    await prisma.graphNode.deleteMany({ where: { userId } });
    await prisma.user.deleteMany({ where: { id: userId } });
  }
  await prisma.$disconnect();
});

describe('health', () => {
  it('GET / returns the running message', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.message).toMatch(/running/i);
  });
});

describe('auth flow', () => {
  it('POST /api/v1/users/ signs up a new user', async () => {
    const res = await request(app).post('/api/v1/users/').send({ email, password });
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(email);
    expect(res.body.is_active).toBe(true);
    userId = res.body.id;
  });

  it('rejects duplicate signup with 400 + detail', async () => {
    const res = await request(app).post('/api/v1/users/').send({ email, password });
    expect(res.status).toBe(400);
    expect(res.body.detail).toContain('already exists');
  });

  it('POST /api/v1/login/access-token returns a token (form-urlencoded)', async () => {
    const res = await request(app)
      .post('/api/v1/login/access-token')
      .type('form')
      .send({ username: email, password });
    expect(res.status).toBe(200);
    expect(typeof res.body.access_token).toBe('string');
    expect(res.body.token_type).toBe('bearer');
    token = res.body.access_token;
  });

  it('rejects bad credentials with 401', async () => {
    const res = await request(app)
      .post('/api/v1/login/access-token')
      .type('form')
      .send({ username: email, password: 'wrong' });
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/users/me requires a token', async () => {
    const res = await request(app).get('/api/v1/users/me');
    expect(res.status).toBe(401);
  });

  it('GET /api/v1/users/me returns the current user with a token', async () => {
    const res = await request(app)
      .get('/api/v1/users/me')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(res.body.email).toBe(email);
  });
});

describe('notes', () => {
  it('POST /api/v1/notes/ creates a note with a non-null graph_node_id', async () => {
    const res = await request(app)
      .post('/api/v1/notes/')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'First note', content: 'hello world', userSummary: 'greeting' });
    expect(res.status).toBe(201);
    expect(res.body.id).toBeGreaterThan(0);
    expect(res.body.graph_node_id).not.toBeNull();
    expect(res.body.title).toBe('First note');
    expect(res.body.content).toBe('hello world');
    expect(res.body.userSummary).toBe('greeting');
    noteId = res.body.id;
    graphNodeId = res.body.graph_node_id;
  });

  it('GET /api/v1/notes/ returns a paginated { items, total }', async () => {
    const res = await request(app)
      .get('/api/v1/notes/')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.items)).toBe(true);
    expect(res.body.total).toBeGreaterThanOrEqual(1);
  });

  it('PUT /api/v1/notes/:id updates content', async () => {
    const res = await request(app)
      .put(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ content: 'updated content' });
    expect(res.status).toBe(200);
    expect(res.body.content).toBe('updated content');
    expect(res.body.graph_node_id).toBe(graphNodeId);
  });

  it('PUT /api/v1/notes/:id updates tags', async () => {
    const res = await request(app)
      .put(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({ tags: ['manual-tag'] });
    expect(res.status).toBe(200);
  });
});

describe('graph', () => {
  it('GET /api/v1/graph/nodes/ returns a bare array with node_type and data.original_note_id', async () => {
    const res = await request(app)
      .get('/api/v1/graph/nodes/')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    const noteNode = res.body.find((n: any) => n.id === graphNodeId);
    expect(noteNode).toBeDefined();
    expect(noteNode.node_type).toBe('note');
    expect(noteNode.data.original_note_id).toBe(noteId);
    expect(noteNode.data.tags).toEqual(['manual-tag']);
    expect(noteNode.position).toBeDefined();
  });

  it('GET /api/v1/graph/edges/ returns a bare array', async () => {
    const res = await request(app)
      .get('/api/v1/graph/edges/')
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe('ai', () => {
  it('POST /api/v1/ai/rag-query returns { answer, sources }', async () => {
    const res = await request(app)
      .post('/api/v1/ai/rag-query')
      .set('Authorization', `Bearer ${token}`)
      .send({ query: 'what did I note?' });
    expect(res.status).toBe(200);
    expect(res.body.answer).toBe('mock answer');
    expect(Array.isArray(res.body.sources)).toBe(true);
  });
});

describe('notes cleanup', () => {
  it('DELETE /api/v1/notes/:id returns 204', async () => {
    const res = await request(app)
      .delete(`/api/v1/notes/${noteId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(res.status).toBe(204);
  });
});
