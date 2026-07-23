// Authentication dependency. Mirrors app/api/deps.py.
import type { NextFunction, Request, Response } from 'express';

import { decodeToken } from '../core/security';
import * as crudUser from '../crud/user';
import { HttpError } from '../errors';

const CREDENTIALS_EXCEPTION = new HttpError(401, 'Could not validate credentials', {
  'WWW-Authenticate': 'Bearer',
});

/** Resolve the current user from the Bearer token and attach it to req.user. */
async function getCurrentUser(req: Request): Promise<import('@prisma/client').User> {
  const authHeader = req.headers.authorization || '';
  const [scheme, token] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token) {
    throw CREDENTIALS_EXCEPTION;
  }

  const tokenData = decodeToken(token);
  if (!tokenData || !tokenData.sub) {
    throw CREDENTIALS_EXCEPTION;
  }

  // The `sub` claim holds the user's email.
  const user = await crudUser.getUserByEmail(tokenData.sub);
  if (!user) {
    throw CREDENTIALS_EXCEPTION;
  }
  return user;
}

/** Express middleware requiring an authenticated, active user. */
export async function getCurrentActiveUser(
  req: Request,
  _res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await getCurrentUser(req);
    if (!user.isActive) {
      throw new HttpError(400, 'Inactive user');
    }
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
}
