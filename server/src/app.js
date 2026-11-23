import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { env } from "./config/env.js";
import routes from "./routes/index.js";
import { errorHandler, notFound } from "./middleware/errors.js";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../");
const clientDist = path.resolve(rootDir, "dist");

export async function createApp() {
  const app = express();

  if (env.isProd) app.set("trust proxy", 1);

  app.use(
    helmet({
      contentSecurityPolicy: env.isProd
        ? {
            directives: {
              defaultSrc: ["'self'"],
              scriptSrc: ["'self'"],
              styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "https://fonts.googleapis.com",
              ],
              fontSrc: ["'self'", "https://fonts.gstatic.com"],
              imgSrc: ["'self'", "data:"],
              connectSrc: ["'self'"],
              objectSrc: ["'none'"],
              frameAncestors: ["'none'"],
            },
          }
        : false,
    }),
  );
  app.use(cors({ origin: env.clientOrigins }));
  app.use(express.json({ limit: "20kb" }));
  app.use(morgan("dev"));

  app.use("/api", routes);

  if (env.isProd) {
    if (fs.existsSync(path.join(clientDist, "index.html"))) {
      app.use(express.static(clientDist, { index: false, maxAge: "1h" }));
      app.use((req, res, next) => {
        if (req.method !== "GET") return next();
        res.sendFile(path.join(clientDist, "index.html"));
      });
    }
  } else {
    const vite = await createViteServer({
      root: rootDir,
      server: { middlewareMode: true, hmr: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  }

  app.use(errorHandler);
  return app;
}
