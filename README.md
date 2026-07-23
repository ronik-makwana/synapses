# Synapse

**Synapse** is a full-stack, AI-powered knowledge management platform. It enables users to create, visualize, and manage their personal knowledge graph with interactive mind maps, semantic search, and Retrieval-Augmented Generation (RAG) using vector databases and LLMs.

---

## 🚀 Features

- **Interactive Mind Map Visualization:** Create, link, and manage notes and files visually.
- **Automatic Semantic Linking:** Notes are auto-connected based on the similarity of their summaries, with relationship strength labeled on each edge.
- **AI-Powered Semantic Search:** Query your knowledge graph using natural language.
- **Retrieval-Augmented Generation (RAG):** Get context-aware answers grounded in your own notes.
- **Full-Stack Solution:** Next.js (React, TypeScript) frontend + Node.js (Express, TypeScript) backend.
- **Type-Safe Data Layer:** Prisma ORM with PostgreSQL and version-controlled migrations.

---

## 🛠️ Tech Stack

- **Frontend:** Next.js, React, TypeScript, React Flow
- **Backend:** Node.js, Express, TypeScript
- **Database:** PostgreSQL
- **Vector Store:** Pinecone
- **ORM & Migrations:** Prisma
- **AI/Embeddings:** LangChain.js, OpenAI (`text-embedding-3-small`, `gpt-4o-mini`)
- **Containerization:** Docker, Docker Compose

---

## ⚡ Quick Start

### 1. **Clone the Repository**

```sh
git clone https://github.com/ronik-makwana/Synapse.git
cd Synapse
```

---

### 2. **Start the Database with Docker Compose**

The provided `docker-compose.yml` (in `mind-map-mentor/backend/`) starts only the PostgreSQL database service. The backend and frontend are started manually (see below).

```sh
cd mind-map-mentor/backend
docker compose up -d
```

- The **PostgreSQL database** will be available at: `localhost:5432`
- **Backend and frontend are NOT started by this command.**

---

### 3. **Manual Local Development**

#### **Backend** (Node.js)

1. **Install dependencies:**
    ```sh
    cd mind-map-mentor/backend
    npm install
    ```
2. **Set up environment variables:**
    ```sh
    cp .env.example .env   # then edit SECRET_KEY, OPENAI_API_KEY, PINECONE_* etc.
    ```
3. **Create the database schema (Prisma):**
    ```sh
    npx prisma migrate dev
    ```
4. **Start the backend server** (http://localhost:8000):
    ```sh
    npm run dev
    ```

See `mind-map-mentor/backend/README.md` for all scripts and details.

#### **Frontend**

1. **Install dependencies:**
    ```sh
    cd mind-map-mentor/frontend
    npm install
    ```
2. **Start the frontend:**
    ```sh
    npm run dev
    ```
3. **Visit** `http://localhost:3000` **in your browser.**

---

## 🗄️ Database & ORM (Prisma)

- **Prisma** handles all database models, queries, and schema migrations.
- The schema is defined in `backend/prisma/schema.prisma`.

### **How to Use Prisma for Migrations**

1. **Create & apply a migration after changing the schema:**
    ```sh
    npx prisma migrate dev --name describe_your_change
    ```
2. **Apply existing migrations (e.g. in CI/prod):**
    ```sh
    npx prisma migrate deploy
    ```
3. **Regenerate the Prisma client:**
    ```sh
    npx prisma generate
    ```

- Migration scripts live in `backend/prisma/migrations/`.

---

## 🧪 Testing

Backend tests run with Vitest + Supertest (the AI layer is mocked, so no external API keys are needed — only the local PostgreSQL):

```sh
cd mind-map-mentor/backend
npm test
```

---

## 🧠 Project Structure

```
Synapse/
├── mind-map-mentor/
│   ├── backend/         # Node.js/Express backend, Prisma ORM, AI logic
│   └── frontend/        # Next.js frontend
```

---

## 📝 Contributing

1. Fork the repo and create your branch.
2. Commit your changes.
3. Push to your fork and submit a pull request.

---

**Questions?**
Open an issue or contact the maintainer!
