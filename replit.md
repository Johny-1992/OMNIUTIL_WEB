# OmniUtil Infrastructure

## Overview

OmniUtil is a world-class blockchain reward-on-consumption infrastructure deployed on BSC Mainnet. It automatically rewards users of any ecosystem (mobile networks, TV, e-banking, e-commerce, casinos, hotels, etc.) with UTIL tokens based on their real spending. An AI Coordinator validates consumption flows and distributes rewards automatically.

## Smart Contract (BSC Mainnet)

- **Contract**: `0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B`
- **Owner Wallet**: `0x40BB46B9D10Dd121e7D2150EC3784782ae648090`
- **Treasury Wallet**: `0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B`
- Creator fee: 0.5% on every movement, Treasury fee: 0.5%
- Annual supply: 1,000,000 UTIL (renewable)

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **Frontend**: React + Vite (artifacts/omniutil) at `/`
- **API framework**: Express 5 (artifacts/api-server) at `/api`
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)
- **UI**: shadcn/ui, Tailwind CSS, framer-motion, recharts, qrcode.react

## Architecture

- **Partner onboarding**: QR Code → multi-step wizard → AI validation → approval
- **Reward engine**: Partner billing API → consumption capture → UTIL calculation → wallet credit
- **Fees**: 0.5% creator + 0.5% treasury auto-deducted on every transaction
- **Multilingual**: 7 languages (FR, EN, ES, ZH, AR, HI, PT)

## Database Tables

- `partners` — ecosystem partners with status, reward rates, and volumes
- `user_wallets` — auto-generated wallets per user per ecosystem
- `transactions` — reward, transfer, exchange, burn, fee events

## Key Routes

### Frontend Pages
- `/` — Hero landing for CEOs/CTOs + live stats + QR code
- `/partner/apply` — Multi-step partner onboarding wizard
- `/partner/dashboard` — Partner stats and user management
- `/dashboard` — AI Coordinator global admin dashboard
- `/users` — User wallet explorer
- `/partners` — Partners directory

### API Endpoints
- `GET /api/stats/overview` — Global KPIs
- `GET /api/partners` — Active partners
- `POST /api/partners` — Submit partner application
- `POST /api/partners/:id/approve` — Approve partner
- `POST /api/partners/:id/reject` — Reject partner
- `GET /api/transactions` — Reward transactions
- `POST /api/transactions/consumption` — Record consumption event
- `GET /api/stats/util-price` — UTIL/USDT price
- `GET /api/contract/info` — BSC contract live data

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/omniutil run dev` — run frontend locally
