// Vitest setup: give the config schema values to validate against.
//
// src/config.ts calls process.exit(1) on missing env vars, which would kill the
// test runner before a single assertion ran. Real .env values are loaded first
// and always win; these are only fallbacks so unit tests that never touch
// Pinecone or Gemini can run on a bare checkout.
import 'dotenv/config';

const fallbacks: Record<string, string> = {
  DATABASE_URL: 'postgresql://user:password@localhost:5432/mindmapdb',
  SECRET_KEY: 'test-secret-key-that-is-at-least-32-chars-long',
  ALGORITHM: 'HS256',
  ACCESS_TOKEN_EXPIRE_MINUTES: '10080',
  PINECONE_API_KEY: 'test-pinecone-key',
  PINECONE_ENVIRONMENT: 'us-east-1',
  PINECONE_CLOUD: 'aws',
  PINECONE_INDEX_NAME: 'test-index',
  GOOGLE_API_KEY: 'test-google-key',
  FILE_STORAGE_PATH: './storage',
  SIMILARITY_THRESHOLD: '0.5',
  SIMILARITY_THRESHOLD_SUMMARY: '0.5',
  SIMILARITY_THRESHOLD_CONTENT: '0.5',
  PORT: '8000',
  CORS_ORIGINS: 'http://localhost:3000',
};

for (const [key, value] of Object.entries(fallbacks)) {
  process.env[key] ??= value;
}
