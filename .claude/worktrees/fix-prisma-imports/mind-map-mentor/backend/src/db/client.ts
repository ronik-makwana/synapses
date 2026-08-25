import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

import { settings } from "../config.js";

const adapter = new PrismaPg({
  connectionString: settings.DATABASE_URL,
});

export const prisma = new PrismaClient({
  adapter,
});

export type { Prisma } from "../generated/prisma/client.js";