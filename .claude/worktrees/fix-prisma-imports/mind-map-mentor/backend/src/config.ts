import "dotenv/config";
import { z } from "zod";

const configSchema = z.object({
  // ============================================================
  // PostgreSQL
  // ============================================================

  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required")
    .url("DATABASE_URL must be a valid URL"),

  // ============================================================
  // JWT
  // ============================================================

  SECRET_KEY: z.string().min(32, "SECRET_KEY must be at least 32 characters"),

  ALGORITHM: z.string().min(1, "ALGORITHM is required"),

  ACCESS_TOKEN_EXPIRE_MINUTES: z.coerce
    .number()
    .int()
    .positive("ACCESS_TOKEN_EXPIRE_MINUTES must be greater than 0"),

  // ============================================================
  // Pinecone
  // ============================================================

  PINECONE_API_KEY: z.string().min(1, "PINECONE_API_KEY is required"),

  PINECONE_ENVIRONMENT: z.string().min(1, "PINECONE_ENVIRONMENT is required"),

  PINECONE_CLOUD: z.enum(["aws", "gcp", "azure"], {
    errorMap: () => ({
      message: "PINECONE_CLOUD must be aws, gcp, or azure",
    }),
  }),

  PINECONE_INDEX_NAME: z.string().min(1, "PINECONE_INDEX_NAME is required"),

  // ============================================================
  // Google Gemini
  // ============================================================

  GOOGLE_API_KEY: z.string().min(1, "GOOGLE_API_KEY is required"),

  // ============================================================
  // File Storage
  // ============================================================

  FILE_STORAGE_PATH: z.string().min(1, "FILE_STORAGE_PATH is required"),

  // ============================================================
  // Similarity thresholds
  // ============================================================

  SIMILARITY_THRESHOLD: z.coerce
    .number()
    .min(0, "SIMILARITY_THRESHOLD must be >= 0")
    .max(1, "SIMILARITY_THRESHOLD must be <= 1"),

  SIMILARITY_THRESHOLD_SUMMARY: z.coerce
    .number()
    .min(0, "SIMILARITY_THRESHOLD_SUMMARY must be >= 0")
    .max(1, "SIMILARITY_THRESHOLD_SUMMARY must be <= 1"),

  SIMILARITY_THRESHOLD_CONTENT: z.coerce
    .number()
    .min(0, "SIMILARITY_THRESHOLD_CONTENT must be >= 0")
    .max(1, "SIMILARITY_THRESHOLD_CONTENT must be <= 1"),

  // ============================================================
  // Server
  // ============================================================

  PORT: z.coerce
    .number()
    .int()
    .min(1, "PORT must be between 1 and 65535")
    .max(65535, "PORT must be between 1 and 65535"),

  // ============================================================
  // CORS
  // ============================================================

  CORS_ORIGINS: z
    .string()
    .min(1, "CORS_ORIGINS is required")
    .transform((value) =>
      value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean),
    ),
});

const result = configSchema.safeParse(process.env);

if (!result.success) {
  console.error("\n❌ Invalid environment variables:\n");

  for (const issue of result.error.issues) {
    const variable = issue.path.join(".");

    console.error(`  ${variable}: ${issue.message}`);
  }

  console.error("\n❌ Server startup aborted.\n");

  process.exit(1);
}

const config = result.data;

/**
 * Application configuration.
 *
 * All environment variables should be accessed through
 * this object instead of process.env throughout the application.
 */
export const settings = {
  // PostgreSQL
  DATABASE_URL: config.DATABASE_URL,

  // JWT
  SECRET_KEY: config.SECRET_KEY,
  ALGORITHM: config.ALGORITHM,
  ACCESS_TOKEN_EXPIRE_MINUTES: config.ACCESS_TOKEN_EXPIRE_MINUTES,

  // Pinecone
  PINECONE_API_KEY: config.PINECONE_API_KEY,
  PINECONE_ENVIRONMENT: config.PINECONE_ENVIRONMENT,
  PINECONE_CLOUD: config.PINECONE_CLOUD,
  PINECONE_INDEX_NAME: config.PINECONE_INDEX_NAME,

  // Google Gemini
  GOOGLE_API_KEY: config.GOOGLE_API_KEY,

  // File storage
  FILE_STORAGE_PATH: config.FILE_STORAGE_PATH,

  // Similarity thresholds
  SIMILARITY_THRESHOLD: config.SIMILARITY_THRESHOLD,
  SIMILARITY_THRESHOLD_SUMMARY: config.SIMILARITY_THRESHOLD_SUMMARY,
  SIMILARITY_THRESHOLD_CONTENT: config.SIMILARITY_THRESHOLD_CONTENT,

  // Server
  PORT: config.PORT,

  // CORS
  CORS_ORIGINS: config.CORS_ORIGINS,
} as const;
