// Express application factory. Mirrors the setup in app/main.py.
import cors from 'cors';
import express, { type Express } from 'express';

import apiRouter from './routes';
import { errorHandler, notFoundHandler } from './middleware/error';

export function createApp(): Express {
  const app = express();

  // CORS — allow the Next.js frontend origin, with credentials.
  app.use(
    cors({
      origin: ['http://localhost:3000', 'http://localhost:3003'],
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
    }),
  );

  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: false }));

  // Health check.
  app.get('/', (_req, res) => {
    res.json({ message: 'Synapse API is running!' });
  });

  // API v1.
  app.use('/api/v1', apiRouter);

  // 404 + error handling.
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
