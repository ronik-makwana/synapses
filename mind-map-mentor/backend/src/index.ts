// Server entrypoint. Mirrors app/main.py's startup.

import { createApp } from "./app";
import { settings } from "./config";
import { ensureStoragePathExists } from "./core/storage";
import { prisma } from "./db/client";

async function main(): Promise<void> {
  console.log("Starting Synapse API...");

  // Create storage directory if it does not exist.
  ensureStoragePathExists();

  // Create Express application.
  const app = createApp();

  // Start HTTP server.
  const server = app.listen(settings.PORT, () => {
    console.log(`Synapse API listening on http://localhost:${settings.PORT}`);
  });

  // Graceful shutdown.
  const shutdown = async (signal: string) => {
    console.log(`\nReceived ${signal}. Shutting down...`);

    server.close(async () => {
      try {
        await prisma.$disconnect();

        console.log("Prisma disconnected.");
        console.log("Server shut down successfully.");

        process.exit(0);
      } catch (error) {
        console.error("Error during shutdown:", error);

        process.exit(1);
      }
    });
  };

  process.on("SIGINT", () => {
    void shutdown("SIGINT");
  });

  process.on("SIGTERM", () => {
    void shutdown("SIGTERM");
  });
}

main().catch((error) => {
  console.error("❌ Fatal startup error:", error);

  process.exit(1);
});
