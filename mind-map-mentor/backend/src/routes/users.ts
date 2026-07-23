// User routes. Mirrors app/api/api_v1/endpoints/users.py.
import { Router } from 'express';

import * as crudUser from '../crud/user';
import { getCurrentActiveUser } from '../middleware/auth';
import { HttpError } from '../errors';
import { asyncHandler } from '../http';
import { userCreateSchema } from '../schemas';
import { serializeUser } from '../serializers';

const router = Router();

// Signup (no auth).
router.post(
  '/',
  asyncHandler(async (req, res) => {
    const body = userCreateSchema.parse(req.body);
    const existing = await crudUser.getUserByEmail(body.email);
    if (existing) {
      throw new HttpError(400, 'The user with this email already exists in the system.');
    }
    const user = await crudUser.createUser(body.email, body.password);
    res.status(201).json(serializeUser(user));
  }),
);

// Current user.
router.get(
  '/me',
  getCurrentActiveUser,
  asyncHandler(async (req, res) => {
    res.json(serializeUser(req.user!));
  }),
);

export default router;
