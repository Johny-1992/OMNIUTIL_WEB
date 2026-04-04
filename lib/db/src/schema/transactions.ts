import {
  pgTable,
  text,
  timestamp,
  real,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const transactionTypeEnum = pgEnum("transaction_type", [
  "reward",
  "transfer",
  "exchange",
  "burn",
  "fee",
]);

export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "confirmed",
  "failed",
]);

export const transactionsTable = pgTable("transactions", {
  id: text("id").primaryKey(),
  type: transactionTypeEnum("type").notNull(),
  fromAddress: text("from_address"),
  toAddress: text("to_address"),
  amount: real("amount").notNull(),
  consumptionAmountUSD: real("consumption_amount_usd"),
  partnerId: text("partner_id"),
  partnerName: text("partner_name"),
  txHash: text("tx_hash"),
  status: transactionStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertTransactionSchema = createInsertSchema(transactionsTable).omit({
  createdAt: true,
});
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactionsTable.$inferSelect;
