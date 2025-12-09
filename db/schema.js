import {
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const whEventTypeEnum = pgEnum("wh_event_type", [
  "payment.created",
  "payment.pending",
  "payment.finalized",
  "payment.failed",
  "refund.created",
  "refund.completed",
]);

export const usersTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().unique(),
});

export const companies = pgTable("companies", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .references(() => usersTable.id)
    .notNull(),
  name: text("name").notNull(),
});

export const webhookEndpoints = pgTable("webhook_endpoints", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),
  name: text("name").notNull(),
  secret: text("secret").notNull(),
  url: text("url").notNull(),
  isActive: integer("is_active").notNull().default(1),
  eventTypes: whEventTypeEnum("event_types").array().notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  companyId: uuid("company_id")
    .references(() => companies.id)
    .notNull(),

  eventType: whEventTypeEnum("event_type").notNull(),
  payload: text("payload").notNull(),

  processed: integer("processed").default(0),

  createdAt: timestamp("created_at").defaultNow(),
});

export const webhookDeliveries = pgTable("webhook_deliveries", {
  id: uuid("id").primaryKey().defaultRandom(),

  eventId: uuid("event_id")
    .references(() => events.id)
    .notNull(),

  endpointId: uuid("endpoint_id")
    .references(() => webhookEndpoints.id)
    .notNull(),

  status: text("status").notNull(),
  statusCode: integer("status_code"),

  responseBody: text("response_body"),
  requestBody: text("request_body"),

  error: text("error"),

  deliveredAt: timestamp("delivered_at").defaultNow(),
});

/* TODO: Wir müssen noch das hier in wh deliveries einfügen attempt: integer("attempt").default(1),
nextAttemptAt: timestamp("next_attempt_at"),
 und auch das hier bei einem fail machen  nextAttemptAt = now + retryDelay
attempt += 1
status = "retrying"
 */
