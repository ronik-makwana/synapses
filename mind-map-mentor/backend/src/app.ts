// Express application factory.
// Responsible only for configuring Express,
// middleware and routes.

import cors from "cors";
import express, { type Express } from "express";

import { settings } from "./config";
import apiRouter from "./routes";
import { errorHandler, notFoundHandler } from "./middleware/error";

export function createApp(): Express {
  const app = express();

  app.use(
    cors({
      origin: settings.CORS_ORIGINS,
      credentials: true,

      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],

      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  );

  app.use(
    express.json({
      limit: "10mb",
    }),
  );

  app.use(
    express.urlencoded({
      extended: false,
    }),
  );

  app.get("/", (_req, res) => {
    res.json({
      message: "Synapse API is running!",
    });
  });
  app.use("/api/v1", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
