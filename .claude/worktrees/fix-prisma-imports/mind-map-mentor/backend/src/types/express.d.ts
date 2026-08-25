// Augment Express Request with the authenticated user.
import type { User } from '@prisma/client';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export {};
