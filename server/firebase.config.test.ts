import { describe, expect, it } from "vitest";
import { ENV } from "./_core/env";
import { firebaseAuthConfigured, verifyFirebaseAdminConnection } from "./_core/firebase";

describe("Firebase configuration", () => {
  it("has the provisioned AURA Admin PEM configuration", () => {
    expect(ENV.firebaseProjectId).toBe("aura-4c3a5");
    expect(ENV.firebaseClientEmail).toContain("firebase-adminsdk-fbsvc@");
    expect(ENV.firebasePrivateKey).toMatch(/^-----BEGIN PRIVATE KEY-----[\s\S]+-----END PRIVATE KEY-----\s*$/);
    expect(firebaseAuthConfigured()).toBe(true);
  });

  it("can authenticate to Firebase Admin and call the Auth API", async () => {
    await expect(verifyFirebaseAdminConnection()).resolves.toBe(true);
  });
});
