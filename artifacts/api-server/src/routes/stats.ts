import { Router, type IRouter } from "express";
import { eq, desc, sql, and, count } from "drizzle-orm";
import { db, partnersTable, userWalletsTable, transactionsTable } from "@workspace/db";
import { GetRewardsTimelineQueryParams } from "@workspace/api-zod";

const CONTRACT_ADDRESS = "0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B";
const OWNER_WALLET = "0x40BB46B9D10Dd121e7D2150EC3784782ae648090";
const TREASURY_WALLET = "0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B";
const TOTAL_ANNUAL_SUPPLY = 1_000_000;

const router: IRouter = Router();

router.get("/stats/overview", async (_req, res): Promise<void> => {
  const [
    totalPartnersResult,
    activePartnersResult,
    totalUsersResult,
    totalRewardsResult,
    totalVolumeResult,
    mintedResult,
    pendingResult,
    rewards24hResult,
    txs24hResult,
  ] = await Promise.all([
    db.select({ count: sql<number>`count(*)` }).from(partnersTable),
    db.select({ count: sql<number>`count(*)` }).from(partnersTable).where(eq(partnersTable.status, "active")),
    db.select({ count: sql<number>`count(*)` }).from(userWalletsTable),
    db.select({ total: sql<number>`coalesce(sum(total_rewards_distributed), 0)` }).from(partnersTable),
    db.select({ total: sql<number>`coalesce(sum(total_volume), 0)` }).from(partnersTable),
    db.select({ total: sql<number>`coalesce(sum(amount), 0)` }).from(transactionsTable).where(eq(transactionsTable.type, "reward")),
    db.select({ count: sql<number>`count(*)` }).from(partnersTable).where(eq(partnersTable.status, "pending")),
    db.select({ total: sql<number>`coalesce(sum(amount), 0)` }).from(transactionsTable).where(
      and(
        eq(transactionsTable.type, "reward"),
        sql`created_at >= now() - interval '24 hours'`
      )
    ),
    db.select({ count: sql<number>`count(*)` }).from(transactionsTable).where(
      sql`created_at >= now() - interval '24 hours'`
    ),
  ]);

  const totalRewards = Number(totalRewardsResult[0]?.total ?? 0);

  res.json({
    totalPartners: Number(totalPartnersResult[0]?.count ?? 0),
    activePartners: Number(activePartnersResult[0]?.count ?? 0),
    totalUsers: Number(totalUsersResult[0]?.count ?? 0),
    totalRewardsDistributed: totalRewards,
    totalConsumptionVolumeUSD: Number(totalVolumeResult[0]?.total ?? 0),
    utilCirculatingSupply: totalRewards,
    utilTotalSupply: TOTAL_ANNUAL_SUPPLY,
    utilPriceUSDT: 0.1,
    pendingApplications: Number(pendingResult[0]?.count ?? 0),
    rewardsLast24h: Number(rewards24hResult[0]?.total ?? 0),
    transactionsLast24h: Number(txs24hResult[0]?.count ?? 0),
  });
});

router.get("/stats/rewards-timeline", async (req, res): Promise<void> => {
  const query = GetRewardsTimelineQueryParams.safeParse(req.query);
  const days = query.success ? (query.data.days ?? 30) : 30;

  const rows = await db.execute(
    sql`
      SELECT
        to_char(date_series::date, 'YYYY-MM-DD') as date,
        coalesce(rewards.total_util, 0) as "rewardsUTIL",
        coalesce(rewards.total_usd, 0) as "consumptionUSD",
        coalesce(users.new_users, 0) as "newUsers"
      FROM generate_series(
        now() - interval '${sql.raw(String(days))} days',
        now(),
        interval '1 day'
      ) AS date_series
      LEFT JOIN (
        SELECT
          date_trunc('day', created_at) as day,
          sum(amount) as total_util,
          sum(consumption_amount_usd) as total_usd
        FROM transactions
        WHERE type = 'reward'
        GROUP BY day
      ) rewards ON date_trunc('day', date_series) = rewards.day
      LEFT JOIN (
        SELECT
          date_trunc('day', created_at) as day,
          count(*) as new_users
        FROM user_wallets
        GROUP BY day
      ) users ON date_trunc('day', date_series) = users.day
      ORDER BY date_series
    `
  );

  res.json(rows.rows);
});

router.get("/stats/top-partners", async (_req, res): Promise<void> => {
  const partners = await db
    .select()
    .from(partnersTable)
    .where(eq(partnersTable.status, "active"))
    .orderBy(desc(partnersTable.totalVolume))
    .limit(10);

  const ranked = partners.map((p, i) => ({
    rank: i + 1,
    partnerId: p.id,
    partnerName: p.name,
    ecosystemType: p.ecosystemType,
    totalVolume: p.totalVolume,
    totalUsers: p.totalUsers,
    totalRewards: p.totalRewardsDistributed,
  }));

  res.json(ranked);
});

router.get("/stats/ecosystem-breakdown", async (_req, res): Promise<void> => {
  const result = await db
    .select({
      type: partnersTable.ecosystemType,
      count: sql<number>`count(*)`,
      volumeUSD: sql<number>`coalesce(sum(total_volume), 0)`,
      rewardsUTIL: sql<number>`coalesce(sum(total_rewards_distributed), 0)`,
    })
    .from(partnersTable)
    .where(eq(partnersTable.status, "active"))
    .groupBy(partnersTable.ecosystemType);

  const totalPartners = result.reduce((sum, r) => sum + Number(r.count), 0) || 1;

  const labelMap: Record<string, string> = {
    mobile: "Mobile Network", tv: "TV / Streaming", ebank: "E-Banking",
    ecommerce: "E-Commerce", casino: "Casino", supermarket: "Supermarket",
    hotel: "Hotel", bar: "Bar & Nightlife", sports_betting: "Sports Betting",
    network: "Telecom Network", other: "Other",
  };

  const segments = result.map(r => ({
    type: r.type,
    label: labelMap[r.type] ?? r.type,
    count: Number(r.count),
    volumeUSD: Number(r.volumeUSD),
    rewardsUTIL: Number(r.rewardsUTIL),
    percentage: Math.round((Number(r.count) / totalPartners) * 100),
  }));

  res.json(segments);
});

router.get("/stats/util-price", async (_req, res): Promise<void> => {
  res.json({
    priceUSDT: 0.1,
    change24h: 2.4,
    volume24h: 125000,
    marketCap: 100000,
    circulatingSupply: 1000000,
    contractAddress: CONTRACT_ADDRESS,
    network: "BSC Mainnet",
  });
});

router.get("/contract/info", async (_req, res): Promise<void> => {
  const mintedResult = await db
    .select({ total: sql<number>`coalesce(sum(amount), 0)` })
    .from(transactionsTable)
    .where(
      and(
        eq(transactionsTable.type, "reward"),
        sql`created_at >= date_trunc('year', now())`
      )
    );

  const minted = Number(mintedResult[0]?.total ?? 0);

  res.json({
    address: CONTRACT_ADDRESS,
    network: "BSC Mainnet",
    totalSupply: TOTAL_ANNUAL_SUPPLY,
    mintedThisYear: minted,
    maxAnnualMint: TOTAL_ANNUAL_SUPPLY,
    ownerWallet: OWNER_WALLET,
    treasuryWallet: TREASURY_WALLET,
    creatorFeePercent: 0.5,
    treasuryFeePercent: 0.5,
    burnPercent: 0,
    verified: true,
  });
});

export default router;
