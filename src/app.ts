import express, { Application } from "express";
import routes from "./routes";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { errorHandler } from "./utils/errorHandler";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import { config } from "./config/env";
import { basicAuth } from "./middlewares/basicAuth";

const app: Application = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  })
);
// Swagger Docs (UI and JSON)
const enableDocs = config.nodeEnv !== "production" || process.env.ENABLE_DOCS === "true";
if (enableDocs) {
  app.get("/docs.json", (_req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  const docsMiddleware = config.nodeEnv === "production" && process.env.DOCS_USER && process.env.DOCS_PASS
    ? [basicAuth(process.env.DOCS_USER, process.env.DOCS_PASS)]
    : [];
  // @ts-ignore express accepts array of handlers
  app.use("/docs", ...docsMiddleware, swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
// Routes
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});
/**
 * @openapi
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Health check
 *     responses:
 *       200:
 *         description: Service is healthy
 */
app.use("/api", routes);

// 404 handler - must be before error handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handling middleware
app.use(errorHandler);

export default app;


