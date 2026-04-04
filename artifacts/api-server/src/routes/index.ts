import { Router, type IRouter } from "express";
import healthRouter from "./health";
import partnersRouter from "./partners";
import usersRouter from "./users";
import transactionsRouter from "./transactions";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(partnersRouter);
router.use(usersRouter);
router.use(transactionsRouter);
router.use(statsRouter);

export default router;
