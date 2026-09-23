import { bigint, index, int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Provider-neutral Firebase Auth UID. Unique per user. */
  authSubject: varchar("authSubject", { length: 128 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

export const campaigns = mysqlTable(
  "campaigns",
  {
    id: int("id").autoincrement().primaryKey(),
    slug: varchar("slug", { length: 96 }).notNull().unique(),
    creatorId: int("creatorId").notNull(),
    title: varchar("title", { length: 160 }).notNull(),
    story: text("story").notNull(),
    category: varchar("category", { length: 64 }).notNull(),
    beneficiaryName: varchar("beneficiaryName", { length: 160 }).notNull(),
    relationship: varchar("relationship", { length: 120 }).notNull(),
    goalAmountMinor: bigint("goalAmountMinor", { mode: "number" }).notNull(),
    raisedAmountMinor: bigint("raisedAmountMinor", { mode: "number" }).default(0).notNull(),
    currency: varchar("currency", { length: 3 }).default("NGN").notNull(),
    status: mysqlEnum("status", [
      "DRAFT",
      "SUBMITTED",
      "VERIFICATION_PENDING",
      "UNDER_REVIEW",
      "APPROVED",
      "PUBLISHED",
      "SUSPENDED",
      "COMPLETED",
      "CANCELLED",
      "REJECTED",
    ]).default("DRAFT").notNull(),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [
    index("campaigns_creator_idx").on(table.creatorId),
    index("campaigns_status_idx").on(table.status),
  ]
);

export type Campaign = typeof campaigns.$inferSelect;
export type InsertCampaign = typeof campaigns.$inferInsert;

export const whatsappEvents = mysqlTable(
  "whatsapp_events",
  {
    id: int("id").autoincrement().primaryKey(),
    eventId: varchar("eventId", { length: 191 }).notNull().unique(),
    phoneNumberId: varchar("phoneNumberId", { length: 64 }),
    payload: text("payload").notNull(),
    receivedAt: timestamp("receivedAt").defaultNow().notNull(),
  },
  table => [index("whatsapp_events_received_idx").on(table.receivedAt)]
);

export const whatsappConversations = mysqlTable(
  "whatsapp_conversations",
  {
    id: int("id").autoincrement().primaryKey(),
    waId: varchar("waId", { length: 32 }).notNull().unique(),
    displayName: varchar("displayName", { length: 160 }),
    state: mysqlEnum("state", ["IDLE", "COLLECTING_CAMPAIGN", "AWAITING_REVIEW", "HUMAN_HANDOFF"]).default("IDLE").notNull(),
    stateData: text("stateData"),
    lastMessageAt: timestamp("lastMessageAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  },
  table => [index("whatsapp_conversations_updated_idx").on(table.updatedAt)]
);

export const whatsappMessages = mysqlTable(
  "whatsapp_messages",
  {
    id: int("id").autoincrement().primaryKey(),
    messageId: varchar("messageId", { length: 191 }).notNull().unique(),
    waId: varchar("waId", { length: 32 }).notNull(),
    direction: mysqlEnum("direction", ["INBOUND", "OUTBOUND"]).notNull(),
    messageType: varchar("messageType", { length: 32 }).notNull(),
    body: text("body"),
    payload: text("payload").notNull(),
    receivedAt: timestamp("receivedAt").defaultNow().notNull(),
  },
  table => [index("whatsapp_messages_wa_idx").on(table.waId, table.receivedAt)]
);

export type WhatsappEvent = typeof whatsappEvents.$inferSelect;
export type WhatsappConversation = typeof whatsappConversations.$inferSelect;
export type WhatsappMessage = typeof whatsappMessages.$inferSelect;
