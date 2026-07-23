// Auth login route. Mirrors app/api/api_v1/endpoints/login.py.
import { Router } from 'express';

import * as crudUser from '../crud/user';
import { createAccessToken } from '../core/security';
import { HttpError } from '../errors';
import { asyncHandler } from '../http';

const router = Router();

// OAuth2-compatible token login. Expects form-urlencoded username + password.
router.post(
  '/access-token',
  asyncHandler(async (req, res) => {
    const username = req.body?.username;
    const password = req.body?.password;
    if (!username || !password) {
      throw new HttpError(422, 'username and password are required');
    }

    const user = await crudUser.authenticateUser(String(username), String(password));
    if (!user) {
      throw new HttpError(401, 'Incorrect email or password', { 'WWW-Authenticate': 'Bearer' });
    }
    if (!user.isActive) {
      throw new HttpError(400, 'Inactive user');
    }

    const accessToken = createAccessToken(user.email);
    res.json({ access_token: accessToken, token_type: 'bearer' });
  }),
);

export default router;
