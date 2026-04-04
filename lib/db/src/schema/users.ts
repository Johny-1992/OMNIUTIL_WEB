import {
  pgTable,
  text,
  timestamp,
  real,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const userWalletsTable = pgTable("user_wallets", {
  walletAddress: text("wallet_address").primaryKey(),
  userId: text("user_id").notNull(),
  partnerId: text("partner_id").notNull(),
  partnerName: text("partner_name").notNull(),
  utilBalance: real("util_balance").notNull().default(0),
  totalEarned: real("total_earned").notNull().default(0),
  totalSpent: real("total_spent").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  lastActivity: timestamp("last_activity", { withTimezone: true }).notNull().defaultNow(),
});

export const insertUserWalletSchema = createInsertSchema(userWalletsTable).omit({
  utilBalance: true,
  totalEarned: true,
  totalSpent: true,
  createdAt: true,
  lastActivity: true,
});
export type InsertUserWallet = z.infer<typeof insertUserWalletSchema>;
export type UserWallet = typeof userWalletsTable.$inferSelect;
