// User CRUD. Mirrors app/crud/crud_user.py.
import type { User } from '../../generated/prisma';

import { prisma } from '../db/client';
import { getPasswordHash, verifyPassword } from '../core/security';

export async function getUserByEmail(email: string): Promise<User | null> {
  return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: string, password: string, fullName: string): Promise<User> {
  return prisma.user.create({
    data: {
      email,
      fullName,
      hashedPassword: getPasswordHash(password),
      isActive: true,
    },
  });
}

export async function authenticateUser(email: string, password: string): Promise<User | null> {
  const user = await getUserByEmail(email);
  if (!user) return null;
  if (!verifyPassword(password, user.hashedPassword)) return null;
  return user;
}

export async function updateUserPassword(userId: number, newPassword: string): Promise<User> {
  return prisma.user.update({
    where: { id: userId },
    data: {
      hashedPassword: getPasswordHash(newPassword),
    },
  });
}
