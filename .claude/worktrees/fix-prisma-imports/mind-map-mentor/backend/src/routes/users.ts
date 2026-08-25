// User routes. Mirrors app/api/api_v1/endpoints/users.py.
import { Router } from 'express';

import * as crudUser from '../crud/user';
import { getCurrentActiveUser } from '../middleware/auth';
import { HttpError } from '../errors';
import { asyncHandler } from '../http';
import { userCreateSchema, changePasswordSchema } from '../schemas';
import { serializeUser } from '../serializers';
import { verifyPassword } from '../core/security';

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
    const user = await crudUser.createUser(body.email, body.password, body.fullName);
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

// Change password for current user.
router.patch(
  '/me/password',
  getCurrentActiveUser,
  asyncHandler(async (req, res) => {
    const body = changePasswordSchema.parse(req.body);
    const user = req.user!;

    // Verify current password
    if (!verifyPassword(body.currentPassword, user.hashedPassword)) {
      throw new HttpError(400, 'Current password is incorrect');
    }

    // Update password
    const updatedUser = await crudUser.updateUserPassword(user.id, body.newPassword);
    res.json(serializeUser(updatedUser));
  }),
);

export default router;
