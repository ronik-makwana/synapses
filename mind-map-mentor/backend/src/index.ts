// Server entrypoint. Mirrors app/main.py's startup.
import { createApp } from './app';
import { settings } from './config';
import { ensureStoragePathExists } from './core/storage';
import { prisma } from './db/client';

async function main(): Promise<void> {
  console.log('Starting up...');
  ensureStoragePathExists();

  const app = createApp();
  const server = app.listen(settings.PORT, () => {
    console.log(`Synapse API listening on http://localhost:${settings.PORT}`);
  });

  const shutdown = async () => {
    console.log('Shutting down...');
    server.close();
    await prisma.$disconnect();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch((err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});
