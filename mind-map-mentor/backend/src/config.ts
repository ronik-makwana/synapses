// Application configuration, loaded and validated from environment variables.
// Mirrors app/core/config.py.
import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),

  SECRET_KEY: z.string().min(1),
  ALGORITHM: z.string().default('HS256'),
  ACCESS_TOKEN_EXPIRE_MINUTES: z.coerce.number().default(10080),

  FILE_STORAGE_PATH: z.string().default('./storage'),

  PINECONE_API_KEY: z.string().min(1),
  PINECONE_ENVIRONMENT: z.string().min(1),
  PINECONE_INDEX_NAME: z.string().min(1),

  GOOGLE_API_KEY: z.string().min(1),

  SIMILARITY_THRESHOLD: z.coerce.number().default(0.5),
  SIMILARITY_THRESHOLD_SUMMARY: z.coerce.number().default(0.5),
  SIMILARITY_THRESHOLD_CONTENT: z.coerce.number().default(0.5),

  PORT: z.coerce.number().default(8000),
});

// In test mode we relax required external-service keys so the suite can run
// without real credentials (the AI layer is mocked in tests).
const isTest = process.env.NODE_ENV === 'test' || process.env.VITEST === 'true';

const parsed = isTest
  ? envSchema.partial({
      PINECONE_API_KEY: true,
      PINECONE_ENVIRONMENT: true,
      PINECONE_INDEX_NAME: true,
    }).parse({
      SECRET_KEY: process.env.SECRET_KEY || 'test-secret-key',
      DATABASE_URL:
        process.env.DATABASE_URL ||
        'postgresql://user:password@localhost:5432/mindmapdb',
      ...process.env,
    })
  : envSchema.parse(process.env);

export const settings = {
  DATABASE_URL: parsed.DATABASE_URL,
  SECRET_KEY: parsed.SECRET_KEY,
  ALGORITHM: parsed.ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES: parsed.ACCESS_TOKEN_EXPIRE_MINUTES,
  FILE_STORAGE_PATH: parsed.FILE_STORAGE_PATH,
  PINECONE_API_KEY: parsed.PINECONE_API_KEY ?? '',
  PINECONE_ENVIRONMENT: parsed.PINECONE_ENVIRONMENT ?? '',
  PINECONE_INDEX_NAME: parsed.PINECONE_INDEX_NAME ?? '',
  GOOGLE_API_KEY: parsed.GOOGLE_API_KEY ?? '',
  SIMILARITY_THRESHOLD: parsed.SIMILARITY_THRESHOLD,
  SIMILARITY_THRESHOLD_SUMMARY: parsed.SIMILARITY_THRESHOLD_SUMMARY,
  SIMILARITY_THRESHOLD_CONTENT: parsed.SIMILARITY_THRESHOLD_CONTENT,
  PORT: parsed.PORT,
};

export type Settings = typeof settings;
