import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { ENV } from "./env";
import { firebaseAuthConfigured } from "./firebase";
import { serveStatic, setupVite } from "./vite";
import { processWhatsappWebhook, verifyWhatsappSignature } from "../whatsapp";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => server.close(() => resolve(true)));
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) return port;
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);
  app.use(express.json({
    limit: "2mb",
    verify: (req, _res, buffer) => {
      (req as express.Request & { rawBody?: Buffer }).rawBody = Buffer.from(buffer);
    },
  }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && (ENV.corsOrigins.includes("*") || ENV.corsOrigins.includes(origin))) {
      res.setHeader("Access-Control-Allow-Origin", origin);
      res.setHeader("Vary", "Origin");
    }
    res.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    if (req.method === "OPTIONS") {
      res.sendStatus(204);
      return;
    }
    next();
  });

  app.get("/api/health", (_req, res) => {
    res.json({
      ok: true,
      service: "aura-api",
      authProvider: "firebase",
      firebaseConfigured: firebaseAuthConfigured(),
      databaseConfigured: Boolean(ENV.databaseUrl),
    });
  });

  app.get("/api/whatsapp/webhook", (req, res) => {
    const mode = String(req.query["hub.mode"] ?? "");
    const token = String(req.query["hub.verify_token"] ?? "");
    const challenge = String(req.query["hub.challenge"] ?? "");
    if (!ENV.whatsappVerifyToken || mode !== "subscribe" || token !== ENV.whatsappVerifyToken || !challenge) {
      res.sendStatus(403);
      return;
    }
    res.status(200).send(challenge);
  });

  app.post("/api/whatsapp/webhook", async (req, res) => {
    const rawBody = (req as express.Request & { rawBody?: Buffer }).rawBody;
    const signature = req.header("x-hub-signature-256");
    if (!rawBody || !verifyWhatsappSignature(rawBody, signature, ENV.whatsappAppSecret)) {
      res.sendStatus(403);
      return;
    }
    try {
      const result = await processWhatsappWebhook(req.body);
      res.status(200).json({ ok: true, ...result });
    } catch (error) {
      console.error("[WhatsApp] Webhook processing failed", error);
      res.sendStatus(500);
    }
  });

  app.use(
    "/api/trpc",
    createExpressMiddleware({ router: appRouter, createContext })
  );

  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000", 10);
  const port = await findAvailablePort(preferredPort);
  if (port !== preferredPort) console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  server.listen(port, () => console.log(`Server running on http://localhost:${port}/`));
}

startServer().catch(console.error);
