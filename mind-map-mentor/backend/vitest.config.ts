import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: { NODE_ENV: 'test' },
    // Fills in any env vars missing from .env so src/config.ts does not
    // process.exit(1) out of the test run. See tests/setup.ts.
    setupFiles: ['./tests/setup.ts'],
    testTimeout: 30000,
    hookTimeout: 30000,
    // Run test files sequentially to avoid DB contention.
    fileParallelism: false,
  },
});
