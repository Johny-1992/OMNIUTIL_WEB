import {
  pgTable,
  text,
  serial,
  timestamp,
  real,
  integer,
  boolean,
  pgEnum,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const ecosystemTypeEnum = pgEnum("ecosystem_type", [
  "mobile",
  "tv",
  "ebank",
  "ecommerce",
  "casino",
  "supermarket",
  "hotel",
  "bar",
  "sports_betting",
  "network",
  "other",
]);

export const partnerStatusEnum = pgEnum("partner_status", [
  "pending",
  "active",
  "suspended",
  "rejected",
]);

export const partnersTable = pgTable("partners", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  ecosystemType: ecosystemTypeEnum("ecosystem_type").notNull(),
  contactName: text("contact_name").notNull(),
  contactEmail: text("contact_email").notNull(),
  walletAddress: text("wallet_address").notNull(),
  rewardRate: real("reward_rate").notNull().default(1.0),
  loyaltyFactor: real("loyalty_factor").notNull().default(1.0),
  billingApiEndpoint: text("billing_api_endpoint").notNull(),
  billingApiKey: text("billing_api_key"),
  description: text("description"),
  country: text("country"),
  estimatedUsers: integer("estimated_users"),
  status: partnerStatusEnum("status").notNull().default("pending"),
  level: integer("level").notNull().default(1),
  totalUsers: integer("total_users").notNull().default(0),
  totalVolume: real("total_volume").notNull().default(0),
  totalRewardsDistributed: real("total_rewards_distributed").notNull().default(0),
  onChainAddress: text("on_chain_address"),
  rejectionReason: text("rejection_reason"),
  acceptedTerms: boolean("accepted_terms").notNull().default(false),
  reviewedAt: timestamp("reviewed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertPartnerSchema = createInsertSchema(partnersTable).omit({
  totalUsers: true,
  totalVolume: true,
  totalRewardsDistributed: true,
  createdAt: true,
  updatedAt: true,
  reviewedAt: true,
});
export type InsertPartner = z.infer<typeof insertPartnerSchema>;
export type Partner = typeof partnersTable.$inferSelect;
