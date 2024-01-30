import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { pgEnum } from "drizzle-orm/pg-core";

// ENUMS
export const subscriptionEnum = pgEnum("subscription", ["free", "premium"]);
export const accountProviderEnum = pgEnum("account_provider", [
  "google",
  "discord",
  "email",
]);

// TABLES
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  fullName: text("full_name"),
  email: varchar("email", { length: 256 }).unique(),
  phone: varchar("phone", { length: 256 }),
  subscription: subscriptionEnum("subscription"),
  accountProvider: accountProviderEnum("account_provider"),
  createdAt: timestamp("created_at").defaultNow(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
