import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { desc } from "drizzle-orm";
import { InsertCampaign, InsertUser, campaigns, users, whatsappConversations, whatsappEvents, whatsappMessages } from "../drizzle/schema";
import { ENV } from "./_core/env";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.authSubject) {
    throw new Error("User authSubject is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      authSubject: user.authSubject,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.authSubject === ENV.ownerAuthSubject) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByAuthSubject(authSubject: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.authSubject, authSubject)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getPublishedCampaigns() {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.status, "PUBLISHED"))
    .orderBy(desc(campaigns.createdAt))
    .limit(6);
}

export async function getCampaignsByCreatorId(creatorId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select()
    .from(campaigns)
    .where(eq(campaigns.creatorId, creatorId))
    .orderBy(desc(campaigns.updatedAt));
}

export async function createCampaignDraft(campaign: InsertCampaign) {
  const db = await getDb();
  if (!db) throw new Error("Database is not available");

  await db.insert(campaigns).values(campaign);
  const result = await db
    .select()
    .from(campaigns)
    .where(eq(campaigns.slug, campaign.slug))
    .limit(1);

  return result[0];
}

export async function recordWhatsappEvent(event: {
  eventId: string;
  phoneNumberId?: string;
  payload: string;
}) {
  const db = await getDb();
  if (!db) return { duplicate: false, persisted: false };
  try {
    await db.insert(whatsappEvents).values(event);
    return { duplicate: false, persisted: true };
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY" || error?.errno === 1062) return { duplicate: true, persisted: true };
    throw error;
  }
}

export async function upsertWhatsappConversation(input: {
  waId: string;
  displayName?: string;
  lastMessageAt?: Date;
}) {
  const db = await getDb();
  if (!db) return;
  const lastMessageAt = input.lastMessageAt ?? new Date();
  await db.insert(whatsappConversations).values({
    waId: input.waId,
    displayName: input.displayName ?? null,
    lastMessageAt,
  }).onDuplicateKeyUpdate({
    set: { displayName: input.displayName ?? null, lastMessageAt },
  });
}

export async function recordWhatsappMessage(message: {
  messageId: string;
  waId: string;
  direction: "INBOUND" | "OUTBOUND";
  messageType: string;
  body?: string;
  payload: string;
}) {
  const db = await getDb();
  if (!db) return { duplicate: false, persisted: false };
  try {
    await db.insert(whatsappMessages).values({ ...message, body: message.body ?? null });
    return { duplicate: false, persisted: true };
  } catch (error: any) {
    if (error?.code === "ER_DUP_ENTRY" || error?.errno === 1062) return { duplicate: true, persisted: true };
    throw error;
  }
}
