import { Router, type IRouter } from "express";
import { eq, desc, sql, and } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db, partnersTable, userWalletsTable, transactionsTable } from "@workspace/db";
import {
  CreatePartnerApplicationBody,
  UpdatePartnerBody,
  GetPartnerParams,
  UpdatePartnerParams,
  ApprovePartnerParams,
  RejectPartnerParams,
  RejectPartnerBody,
  GetPartnerStatsParams,
  ListApplicationsQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/partners", async (req, res): Promise<void> => {
  const partners = await db
    .select()
    .from(partnersTable)
    .where(eq(partnersTable.status, "active"))
    .orderBy(desc(partnersTable.totalVolume));
  res.json(partners);
});

router.post("/partners", async (req, res): Promise<void> => {
  const parsed = CreatePartnerApplicationBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const id = randomUUID();
  const [partner] = await db
    .insert(partnersTable)
    .values({
      id,
      name: parsed.data.name,
      ecosystemType: parsed.data.ecosystemType as any,
      contactName: parsed.data.contactName,
      contactEmail: parsed.data.contactEmail,
      walletAddress: parsed.data.walletAddress,
      rewardRate: parsed.data.rewardRate,
      billingApiEndpoint: parsed.data.billingApiEndpoint,
      billingApiKey: parsed.data.billingApiKey,
      description: parsed.data.description,
      country: parsed.data.country,
      estimatedUsers: parsed.data.estimatedUsers,
      acceptedTerms: parsed.data.acceptedTerms,
      status: "pending",
      level: 1,
    })
    .returning();

  res.status(201).json(partner);
});

router.get("/applications", async (req, res): Promise<void> => {
  const query = ListApplicationsQueryParams.safeParse(req.query);
  const statusFilter = query.success ? query.data.status : undefined;

  const conditions = statusFilter
    ? [eq(partnersTable.status, statusFilter as any)]
    : [];

  const applications = await db
    .select()
    .from(partnersTable)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(desc(partnersTable.createdAt));

  res.json(applications);
});

router.get("/partners/:id", async (req, res): Promise<void> => {
  const params = GetPartnerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [partner] = await db
    .select()
    .from(partnersTable)
    .where(eq(partnersTable.id, params.data.id));

  if (!partner) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }

  res.json(partner);
});

router.patch("/partners/:id", async (req, res): Promise<void> => {
  const params = UpdatePartnerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = UpdatePartnerBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const updateData: Partial<typeof partnersTable.$inferInsert> = {};
  if (body.data.rewardRate !== undefined) updateData.rewardRate = body.data.rewardRate;
  if (body.data.loyaltyFactor !== undefined) updateData.loyaltyFactor = body.data.loyaltyFactor;
  if (body.data.apiEndpoint !== undefined) updateData.billingApiEndpoint = body.data.apiEndpoint;
  if (body.data.level !== undefined) updateData.level = body.data.level;

  const [partner] = await db
    .update(partnersTable)
    .set(updateData)
    .where(eq(partnersTable.id, params.data.id))
    .returning();

  if (!partner) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }

  res.json(partner);
});

router.post("/partners/:id/approve", async (req, res): Promise<void> => {
  const params = ApprovePartnerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [partner] = await db
    .update(partnersTable)
    .set({
      status: "active",
      reviewedAt: new Date(),
      onChainAddress: `0x${randomUUID().replace(/-/g, "").slice(0, 40)}`,
    })
    .where(eq(partnersTable.id, params.data.id))
    .returning();

  if (!partner) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }

  res.json(partner);
});

router.post("/partners/:id/reject", async (req, res): Promise<void> => {
  const params = RejectPartnerParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const body = RejectPartnerBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [partner] = await db
    .update(partnersTable)
    .set({
      status: "rejected",
      rejectionReason: body.data.reason,
      reviewedAt: new Date(),
    })
    .where(eq(partnersTable.id, params.data.id))
    .returning();

  if (!partner) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }

  res.json(partner);
});

router.get("/partners/:id/stats", async (req, res): Promise<void> => {
  const params = GetPartnerStatsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [partner] = await db
    .select()
    .from(partnersTable)
    .where(eq(partnersTable.id, params.data.id));

  if (!partner) {
    res.status(404).json({ error: "Partner not found" });
    return;
  }

  const usersResult = await db
    .select({ count: sql<number>`count(*)` })
    .from(userWalletsTable)
    .where(eq(userWalletsTable.partnerId, params.data.id));

  const recentTxs = await db
    .select()
    .from(transactionsTable)
    .where(eq(transactionsTable.partnerId, params.data.id))
    .orderBy(desc(transactionsTable.createdAt))
    .limit(10);

  const rewardsThisMonth = await db
    .select({ total: sql<number>`coalesce(sum(amount), 0)` })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.partnerId, params.data.id),
        eq(transactionsTable.type, "reward"),
        sql`created_at >= date_trunc('month', now())`
      )
    );

  res.json({
    partnerId: params.data.id,
    totalUsers: Number(usersResult[0]?.count ?? 0),
    activeUsers: Math.floor(Number(usersResult[0]?.count ?? 0) * 0.7),
    totalConsumptionUSD: partner.totalVolume,
    totalRewardsUTIL: partner.totalRewardsDistributed,
    rewardsThisMonth: Number(rewardsThisMonth[0]?.total ?? 0),
    avgRewardPerUser: partner.totalUsers > 0
      ? partner.totalRewardsDistributed / partner.totalUsers
      : 0,
    recentTransactions: recentTxs,
  });
});

router.get("/qr/partner-onboarding", async (_req, res): Promise<void> => {
  const onboardingUrl = `${process.env.REPL_SLUG ? `https://${process.env.REPL_SLUG}.replit.app` : "http://localhost"}/partner/apply`;
  res.json({
    url: onboardingUrl,
    partnerOnboardingUrl: onboardingUrl,
    qrImageBase64: null,
  });
});

export default router;
