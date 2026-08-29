import "dotenv/config";
import { defineConfig } from "prisma/config";

// `prisma generate` runs on `npm install` (see the postinstall script) so the
// client is never committed. Generate does not talk to the database, but Prisma
// still resolves the datasource URL eagerly, so fall back to the local
// docker-compose connection string from .env.example when DATABASE_URL is unset.
// The application itself never uses this fallback: src/config.ts refuses to boot
// without a real DATABASE_URL.
const DEV_DATABASE_URL = "postgresql://user:password@localhost:5432/mindmapdb";

export default defineConfig({
  schema: "prisma/schema.prisma",

  migrations: {
    path: "prisma/migrations",
  },

  datasource: {
    url: process.env.DATABASE_URL ?? DEV_DATABASE_URL,
  },
});
