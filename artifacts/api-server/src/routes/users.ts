import { Router, type IRouter } from "express";
import { eq, desc, sql } from "drizzle-orm";
import { db, userWalletsTable, transactionsTable, partnersTable } from "@workspace/db";
import {
  GetUserParams,
  GetUserTransactionsParams,
  GetUserTransactionsQueryParams,
  ListUsersQueryParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/users", async (req, res): Promise<void> => {
  const query = ListUsersQueryParams.safeParse(req.query);
  const page = query.success ? (query.data.page ?? 1) : 1;
  const limit = query.success ? (query.data.limit ?? 20) : 20;
  const partnerId = query.success ? query.data.partnerId : undefined;
  const offset = (page - 1) * limit;

  const baseQuery = db
    .select()
    .from(userWalletsTable)
    .orderBy(desc(userWalletsTable.lastActivity))
    .limit(limit)
    .offset(offset);

  const countQuery = db
    .select({ count: sql<number>`count(*)` })
    .from(userWalletsTable);

  const [users, countResult] = await Promise.all([
    partnerId
      ? baseQuery.where(eq(userWalletsTable.partnerId, partnerId))
      : baseQuery,
    partnerId
      ? countQuery.where(eq(userWalletsTable.partnerId, partnerId))
      : countQuery,
  ]);

  res.json({
    data: users,
    total: Number(countResult[0]?.count ?? 0),
    page,
    limit,
  });
});

router.get("/users/:walletAddress", async (req, res): Promise<void> => {
  const params = GetUserParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [user] = await db
    .select()
    .from(userWalletsTable)
    .where(eq(userWalletsTable.walletAddress, params.data.walletAddress));

  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
});

router.get("/users/:walletAddress/transactions", async (req, res): Promise<void> => {
  const params = GetUserTransactionsParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const queryParams = GetUserTransactionsQueryParams.safeParse(req.query);
  const page = queryParams.success ? (queryParams.data.page ?? 1) : 1;
  const limit = 20;
  const offset = (page - 1) * limit;

  const [txs, countResult] = await Promise.all([
    db
      .select()
      .from(transactionsTable)
      .where(eq(transactionsTable.toAddress, params.data.walletAddress))
      .orderBy(desc(transactionsTable.createdAt))
      .limit(limit)
      .offset(offset),
    db
      .select({ count: sql<number>`count(*)` })
      .from(transactionsTable)
      .where(eq(transactionsTable.toAddress, params.data.walletAddress)),
  ]);

  res.json({
    data: txs,
    total: Number(countResult[0]?.count ?? 0),
    page,
    limit,
  });
});

export default router;
