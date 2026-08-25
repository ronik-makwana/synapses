// AI routes. Mirrors app/api/api_v1/endpoints/ai.py.
import { Router } from 'express';

import { querySimilarNotes } from '../ai/vectorstore';
import { generateRagAnswer } from '../ai/rag';
import { getCurrentActiveUser } from '../middleware/auth';
import { HttpError } from '../errors';
import { asyncHandler } from '../http';
import { ragQuerySchema } from '../schemas';

const router = Router();

router.use(getCurrentActiveUser);

// Semantic note search.
router.get(
  '/search-notes',
  asyncHandler(async (req, res) => {
    const query = typeof req.query.query === 'string' ? req.query.query : '';
    if (!query) {
      throw new HttpError(400, 'Query parameter cannot be empty.');
    }
    let topK = Number(req.query.top_k ?? 5);
    if (!Number.isFinite(topK) || topK < 1) topK = 5;
    if (topK > 20) topK = 20;

    const results = await querySimilarNotes({
      queryText: query,
      userId: req.user!.id,
      embeddingTypeFilter: 'content',
      topK,
    });

    res.json({
      query,
      results: results.map((r) => ({ id: r.id, score: r.score, metadata: r.metadata })),
    });
  }),
);

// Retrieval-augmented generation.
router.post(
  '/rag-query',
  asyncHandler(async (req, res) => {
    const body = ragQuerySchema.parse(req.body);
    if (!body.query) {
      throw new HttpError(400, 'Query cannot be empty.');
    }
    const result = await generateRagAnswer(body.query, req.user!.id);
    res.json(result);
  }),
);

export default router;
