import crypto from "node:crypto";
import { recordWhatsappEvent, recordWhatsappMessage, upsertWhatsappConversation } from "./db";

export type WhatsappWebhookPayload = {
  object?: string;
  entry?: Array<{
    id?: string;
    changes?: Array<{
      field?: string;
      value?: {
        messaging_product?: string;
        metadata?: { phone_number_id?: string };
        contacts?: Array<{ wa_id?: string; profile?: { name?: string } }>;
        messages?: Array<{
          from?: string;
          id?: string;
          timestamp?: string;
          type?: string;
          text?: { body?: string };
        }>;
        statuses?: Array<{ id?: string; status?: string; recipient_id?: string }>;
      };
    }>;
  }>;
};

export function verifyWhatsappSignature(rawBody: Buffer, signature: string | undefined, appSecret: string) {
  if (!signature || !signature.startsWith("sha256=") || !appSecret) return false;
  const expected = Buffer.from(`sha256=${crypto.createHmac("sha256", appSecret).update(rawBody).digest("hex")}`);
  const received = Buffer.from(signature);
  return expected.length === received.length && crypto.timingSafeEqual(expected, received);
}

function eventKey(messageId: string | undefined, statusId: string | undefined, fallback: string) {
  return messageId ?? statusId ?? fallback;
}

export async function processWhatsappWebhook(payload: WhatsappWebhookPayload) {
  if (payload.object !== "whatsapp_business_account") throw new Error("Unsupported WhatsApp webhook object");
  let events = 0;
  let messages = 0;
  let duplicates = 0;

  for (const entry of payload.entry ?? []) {
    for (const change of entry.changes ?? []) {
      const value = change.value;
      if (!value) continue;
      const phoneNumberId = value.metadata?.phone_number_id;
      const contacts = new Map((value.contacts ?? []).filter(contact => contact.wa_id).map(contact => [contact.wa_id as string, contact.profile?.name]));

      for (const message of value.messages ?? []) {
        if (!message.id || !message.from) continue;
        const eventId = eventKey(message.id, undefined, `${entry.id ?? "unknown"}:${message.timestamp ?? "unknown"}`);
        const event = await recordWhatsappEvent({ eventId, phoneNumberId, payload: JSON.stringify(payload) });
        if (event.duplicate) { duplicates += 1; continue; }
        events += 1;
        await upsertWhatsappConversation({ waId: message.from, displayName: contacts.get(message.from) });
        await recordWhatsappMessage({
          messageId: message.id,
          waId: message.from,
          direction: "INBOUND",
          messageType: message.type ?? "unknown",
          body: message.text?.body,
          payload: JSON.stringify(message),
        });
        messages += 1;
      }

      for (const status of value.statuses ?? []) {
        if (!status.id) continue;
        const eventId = eventKey(undefined, status.id, `${entry.id ?? "unknown"}:status`);
        const event = await recordWhatsappEvent({ eventId, phoneNumberId, payload: JSON.stringify(payload) });
        if (!event.duplicate) events += 1;
      }
    }
  }

  return { events, messages, duplicates };
}
