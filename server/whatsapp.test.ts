import crypto from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./db", () => ({
  recordWhatsappEvent: vi.fn().mockResolvedValue({ duplicate: false, persisted: false }),
  recordWhatsappMessage: vi.fn().mockResolvedValue({ duplicate: false, persisted: false }),
  upsertWhatsappConversation: vi.fn().mockResolvedValue(undefined),
}));

import { processWhatsappWebhook, verifyWhatsappSignature } from "./whatsapp";
import { recordWhatsappEvent, recordWhatsappMessage, upsertWhatsappConversation } from "./db";

describe("WhatsApp webhook security", () => {
  const secret = "test-app-secret";
  const body = Buffer.from(JSON.stringify({ object: "whatsapp_business_account" }));

  beforeEach(() => vi.clearAllMocks());

  it("accepts a valid Meta HMAC signature and rejects a tampered one", () => {
    const digest = crypto.createHmac("sha256", secret).update(body).digest("hex");
    expect(verifyWhatsappSignature(body, `sha256=${digest}`, secret)).toBe(true);
    expect(verifyWhatsappSignature(Buffer.from("tampered"), `sha256=${digest}`, secret)).toBe(false);
    expect(verifyWhatsappSignature(body, undefined, secret)).toBe(false);
  });

  it("persists inbound text messages through the deduplicated processing seam", async () => {
    const result = await processWhatsappWebhook({
      object: "whatsapp_business_account",
      entry: [{
        id: "waba-1",
        changes: [{
          field: "messages",
          value: {
            metadata: { phone_number_id: "phone-1" },
            contacts: [{ wa_id: "2348000000000", profile: { name: "AURA Tester" } }],
            messages: [{ id: "wamid.test.1", from: "2348000000000", type: "text", text: { body: "Hi AURA" } }],
          },
        }],
      }],
    });

    expect(result).toEqual({ events: 1, messages: 1, duplicates: 0 });
    expect(recordWhatsappEvent).toHaveBeenCalledOnce();
    expect(upsertWhatsappConversation).toHaveBeenCalledWith({ waId: "2348000000000", displayName: "AURA Tester" });
    expect(recordWhatsappMessage).toHaveBeenCalledWith(expect.objectContaining({ messageId: "wamid.test.1", body: "Hi AURA", direction: "INBOUND" }));
  });
});
