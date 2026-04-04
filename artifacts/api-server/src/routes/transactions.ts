import { Router, type IRouter } from "express";
import { eq, desc, sql, and } from "drizzle-orm";
import { randomUUID } from "crypto";
import { db, transactionsTable, userWalletsTable, partnersTable } from "@workspace/db";
import {
  ListTransactionsQueryParams,
  RecordConsumptionBody,
} from "@workspace/api-zod";

const OWNER_WALLET = "0x40BB46B9D10Dd121e7D2150EC3784782ae648090";
const CREATOR_FEE = 0.005;
const TREASURY_FEE = 0.005;
const UTIL_USDT_PRICE = 0.1;

function generateWalletAddress(): string {
  const chars = "0123456789abcdef";
  let addr = "0x";
  for (let i = 0; i < 40; i++) {
    addr += chars[Math.floor(Math.random() * chars.length)];
  }
  return addr;
}

async function getOrCreateUserWallet(
  userId: string,
  partnerId: string,
  partnerName: string
): Promise<string> {
  const [existing] = await db
    .select()
    .from(userWalletsTable)
    .where(
      and(
        eq(userWalletsTable.userId, userId),
        eq(userWalletsTable.partnerId, partnerId)
      )
    );

  if (existing) return existing.walletAddress;

  const walletAddress = generateWalletAddress();
  await db.insert(userWalletsTable).values({
    walletAddress,
    userId,
    partnerId,
    partnerName,
  });

  return walletAddress;
}

const router: IRouter = Router();

router.get("/transactions", async (req, res): Promise<void> => {
  const query = ListTransactionsQueryParams.safeParse(req.query);
  const page = query.success ? (query.data.page ?? 1) : 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const conditions: any[] = [];
  if (query.success && query.data.partnerId) {
    conditions.push(eq(transactionsTable.partnerId, query.data.partnerId));
  }
  if (query.success && query.data.type) {
    conditions.push(eq(transactionsTable.type, query.data.type as any));
  }

  const [txs, countResult] = await Promise.all([
    db
      .select()
      .from(transactionsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined)
      .orderBy(desc(transactionsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(transactionsTable)
      .where(conditions.length > 0 ? and(...conditions) : undefined),
  ]);

  res.json({
    data: txs,
    total: Number(countResult[0]?.count ?? 0),
    page,
    limit,
  });
});

router.post("/transactions/consumption", async (req, res): Promise<void> => {
  const parsed = RecordConsumptionBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const [partner] = await db
    .select()
    .from(partnersTable)
    .where(
      and(
        eq(partnersTable.billingApiKey, parsed.data.partnerApiKey),
        eq(partnersTable.status, "active")
      )
    );

  if (!partner) {
    res.status(403).json({ error: "Invalid partner API key or partner not active" });
    return;
  }

  const usdRates: Record<string, number> = {
    USD: 1, EUR: 1.08, XAF: 0.00163, GBP: 1.27, XOF: 0.00163,
    MAD: 0.1, NGN: 0.00065, KES: 0.0077, ZAR: 0.054,
  };
  const rate = usdRates[parsed.data.currency.toUpperCase()] ?? 1;
  const consumptionUSD = parsed.data.amountLocal * rate;

  const rewardRateFactor = (partner.rewardRate / 100) * partner.loyaltyFactor;
  const grossRewardUTIL = (consumptionUSD * rewardRateFactor) / UTIL_USDT_PRICE;
  const creatorFeeUTIL = grossRewardUTIL * CREATOR_FEE;
  const treasuryFeeUTIL = grossRewardUTIL * TREASURY_FEE;
  const netRewardUTIL = grossRewardUTIL - creatorFeeUTIL - treasuryFeeUTIL;

  const walletAddress = await getOrCreateUserWallet(
    parsed.data.userId,
    partner.id,
    partner.name
  );

  const txId = randomUUID();
  const txHash = `0x${randomUUID().replace(/-/g, "")}`;

  await db.insert(transactionsTable).values({
    id: txId,
    type: "reward",
    fromAddress: OWNER_WALLET,
    toAddress: walletAddress,
    amount: netRewardUTIL,
    consumptionAmountUSD: consumptionUSD,
    partnerId: partner.id,
    partnerName: partner.name,
    txHash,
    status: "confirmed",
  });

  await db
    .update(userWalletsTable)
    .set({
      utilBalance: sql`util_balance + ${netRewardUTIL}`,
      totalEarned: sql`total_earned + ${netRewardUTIL}`,
      lastActivity: new Date(),
    })
    .where(eq(userWalletsTable.walletAddress, walletAddress));

  await db
    .update(partnersTable)
    .set({
      totalVolume: sql`total_volume + ${consumptionUSD}`,
      totalRewardsDistributed: sql`total_rewards_distributed + ${netRewardUTIL}`,
    })
    .where(eq(partnersTable.id, partner.id));

  res.status(201).json({
    success: true,
    userId: parsed.data.userId,
    utilRewarded: netRewardUTIL,
    consumptionUSD,
    txHash,
    walletAddress,
  });
});

export default router;
