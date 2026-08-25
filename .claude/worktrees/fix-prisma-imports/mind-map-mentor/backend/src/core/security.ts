// Password hashing and JWT handling. Mirrors app/core/security.py.
// bcryptjs verifies the passlib-generated `$2b$` hashes from the old backend,
// and jsonwebtoken uses the same HS256 + `sub` (email) claim, so existing
// password hashes and issued tokens remain valid.
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { settings } from '../config';

export function verifyPassword(plainPassword: string, hashedPassword: string): boolean {
  try {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  } catch {
    return false;
  }
}

export function getPasswordHash(password: string): string {
  return bcrypt.hashSync(password, 12);
}

export interface TokenData {
  sub: string;
}

export function createAccessToken(subject: string, expiresMinutes?: number): string {
  const minutes = expiresMinutes ?? settings.ACCESS_TOKEN_EXPIRE_MINUTES;
  return jwt.sign({ sub: subject }, settings.SECRET_KEY, {
    algorithm: settings.ALGORITHM as jwt.Algorithm,
    expiresIn: `${minutes}m`,
  });
}

export function decodeToken(token: string): TokenData | null {
  try {
    const payload = jwt.verify(token, settings.SECRET_KEY, {
      algorithms: [settings.ALGORITHM as jwt.Algorithm],
    });
    if (typeof payload === 'string') return null;
    const sub = payload.sub;
    if (!sub || typeof sub !== 'string') return null;
    return { sub };
  } catch {
    // Invalid token (expired, bad signature, etc.)
    return null;
  }
}
