-- Rich-text source of truth for a note. `content` stays the plain-text
-- projection derived from this, so every existing row (and every vector already
-- in Pinecone) remains valid with the column left NULL.
ALTER TABLE "notes" ADD COLUMN "content_json" JSONB;
