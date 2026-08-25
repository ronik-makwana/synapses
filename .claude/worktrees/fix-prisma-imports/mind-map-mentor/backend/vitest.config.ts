import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    env: { NODE_ENV: 'test' },
    testTimeout: 30000,
    hookTimeout: 30000,
    // Run test files sequentially to avoid DB contention.
    fileParallelism: false,
  },
});
