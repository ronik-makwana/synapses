// Single shared PrismaClient instance (mirrors app/db/session.py).
import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

export type { Prisma } from '@prisma/client';
