// Small HTTP helpers shared across routers.
import type { NextFunction, Request, Response } from 'express';

import { HttpError } from './errors';

/** Wrap an async route handler so thrown errors reach the error middleware. */
export function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>,
) {
  return (req: Request, res: Response, next: NextFunction): void => {
    fn(req, res, next).catch(next);
  };
}

/** Parse an integer path param, throwing a 422 for non-numeric values. */
export function parseIdParam(value: string, name = 'id'): number {
  const n = Number(value);
  if (!Number.isInteger(n)) {
    throw new HttpError(422, `Invalid ${name}`);
  }
  return n;
}
