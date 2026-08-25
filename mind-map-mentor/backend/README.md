# Synapse Backend (Node.js)

Node.js / TypeScript backend for Synapse. A drop-in replacement for the original
FastAPI backend — same REST API (`/api/v1`, port 8000), same PostgreSQL schema,
and the same Pinecone vector layout, so the existing Next.js frontend works
unchanged.

## Stack

- **Express** (HTTP) + **TypeScript**
- **Prisma** ORM (PostgreSQL) — replaces SQLAlchemy + Alembic
- **jsonwebtoken** (HS256) + **bcryptjs** — verifies the old backend's bcrypt
  password hashes, so existing users keep working
- **Zod** request validation
- **LangChain.js** + **OpenAI** (`text-embedding-3-small`, `gpt-4o-mini`) + **Pinecone**
- **Vitest** + **Supertest** tests

## Setup

```sh
cd mind-map-mentor/backend

# 1. Start PostgreSQL (Docker)
docker compose up -d

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env      # then edit SECRET_KEY, OPENAI_API_KEY, PINECONE_* etc.

# 4. Create the database schema
npx prisma migrate dev

# 5. Run the dev server (http://localhost:8000)
npm run dev
```

## Scripts

| Script | Purpose |
|---|---|
| `npm run dev` | Start dev server with hot reload (tsx) |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled server (`dist/index.js`) |
| `npm run typecheck` | Type-check without emitting |
| `npm test` | Run the Vitest suite |
| `npm run prisma:migrate` | Create/apply a Prisma migration |
| `npm run prisma:generate` | Regenerate the Prisma client |

## Tests

`npm test` runs unit tests (password hashing, JWT) and integration tests
(auth flow, notes CRUD, graph, RAG) via Supertest. The AI layer (OpenAI /
Pinecone) is mocked, so tests need only the local PostgreSQL from
`docker compose up`. No external API keys are required to run them.

## Project layout

```
src/
  index.ts          # server entrypoint
  app.ts            # Express app factory (CORS, routers, error handling)
  config.ts         # env config (zod-validated)
  db/client.ts      # PrismaClient singleton
  core/             # security (JWT/bcrypt), storage
  middleware/       # auth, error handler
  schemas.ts        # zod request schemas
  serializers.ts    # Prisma rows -> frontend JSON shapes
  crud/             # user, note, file, graph
  ai/               # embeddings, vectorstore, organizer, rag
  routes/           # login, users, notes, files, graph, ai
prisma/schema.prisma
tests/
```
