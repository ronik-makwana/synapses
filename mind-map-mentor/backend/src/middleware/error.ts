// Central error handler — serializes errors to FastAPI's `{ detail }` shape.
import type { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';

import { HttpError } from '../errors';

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _next: NextFunction,
): void {
  if (err instanceof HttpError) {
    if (err.headers) {
      for (const [k, v] of Object.entries(err.headers)) res.setHeader(k, v);
    }
    res.status(err.status).json({ detail: err.detail });
    return;
  }

  if (err instanceof ZodError) {
    // Mirror FastAPI/Pydantic 422 for validation errors.
    const detail = err.errors.map((e) => ({
      loc: e.path,
      msg: e.message,
      type: e.code,
    }));
    res.status(422).json({ detail });
    return;
  }

  console.error('Unhandled error:', err);
  res.status(500).json({ detail: 'Internal server error' });
}

/** 404 handler for unmatched routes. */
export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({ detail: 'Not Found' });
}
