import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import type { DecodedIdToken } from "firebase-admin/auth";
import type { Request } from "express";
import { getUserByAuthSubject, upsertUser } from "../db";
import type { User } from "../../drizzle/schema";
import { ENV } from "./env";

let firebaseApp: App | null = null;

function getFirebaseApp() {
  if (firebaseApp) return firebaseApp;
  if (!ENV.firebaseProjectId || !ENV.firebaseClientEmail || !ENV.firebasePrivateKey) {
    return null;
  }

  firebaseApp = getApps()[0] ?? initializeApp({
    credential: cert({
      projectId: ENV.firebaseProjectId,
      clientEmail: ENV.firebaseClientEmail,
      privateKey: ENV.firebasePrivateKey,
    }),
  });
  return firebaseApp;
}

function getBearerToken(req: Request) {
  const header = req.headers.authorization;
  return typeof header === "string" && header.startsWith("Bearer ")
    ? header.slice("Bearer ".length)
    : null;
}

async function syncUser(decoded: DecodedIdToken): Promise<User | null> {
  const authSubject = decoded.uid;
  await upsertUser({
    authSubject,
    name: decoded.name ?? null,
    email: decoded.email ?? null,
    loginMethod: decoded.firebase?.sign_in_provider ?? "firebase",
    lastSignedIn: new Date(),
  });

  return (await getUserByAuthSubject(authSubject)) ?? null;
}

export async function authenticateFirebaseRequest(req: Request): Promise<User | null> {
  const app = getFirebaseApp();
  const token = getBearerToken(req);
  if (!app || !token) return null;

  try {
    const decoded = await getAuth(app).verifyIdToken(token);
    return await syncUser(decoded);
  } catch (error) {
    console.warn("[Auth] Firebase token verification failed", String(error));
    return null;
  }
}

export function firebaseAuthConfigured() {
  return Boolean(ENV.firebaseProjectId && ENV.firebaseClientEmail && ENV.firebasePrivateKey);
}

export async function verifyFirebaseAdminConnection() {
  const app = getFirebaseApp();
  if (!app) throw new Error("Firebase Admin is not configured");
  await getAuth(app).listUsers(1);
  return true;
}
