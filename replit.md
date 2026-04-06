# OmniUtil Infrastructure

## Overview

OmniUtil is a God-tier blockchain reward-on-consumption infrastructure deployed on BSC Mainnet. It automatically rewards users of any ecosystem (mobile networks, TV, e-banking, e-commerce, casinos, hotels, sports betting, etc.) with UTIL tokens based on real spending. An AI Coordinator validates consumption flows and distributes rewards automatically.

## Smart Contract (BSC Mainnet) — REAL ON-CHAIN DATA

- **Contract**: `0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B`
- **Owner Wallet (CREATOR)**: `0x40BB46B9D10Dd121e7D2150EC3784782ae648090`
- **Treasury Wallet**: `0xB13B61a6a84ABfAEfF17E92E41ee6F0eBF42693B`
- **BSCScan**: https://bscscan.com/token/0xC8A3EA13b51C5e0a8e5c979d6A0b4BDa6bb1e76B
- Creator fee: 0.5% on every transaction, Treasury fee: 0.5% — enforced on-chain for life
- `totalSupply()` on-chain: 1,000,000 UTIL (verified BSC Mainnet)
- `MAX_ANNUAL_MINT()` on-chain: 10,000,000 UTIL (verified BSC Mainnet)
- `decimals()`: 18
- `mintedThisYear()`: 0 UTIL (nothing minted yet)
- Token not yet listed on DEX — price sourced from DexScreener/CoinGecko with fallback

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
- **UI**: shadcn/ui, Tailwind CSS, framer-motion, qrcode.react, lucide-react
- **Blockchain**: ethers.js (BSC Mainnet reads via multiple RPC fallbacks)
- **Security**: helmet, express-rate-limit, CORS, request size limits

## Architecture

- **Partner onboarding**: QR Code → 5-step wizard → AI validation → approval/rejection
- **Reward engine**: Partner billing API → consumption capture → UTIL calculation → wallet credit
- **Fees**: 0.5% creator + 0.5% treasury auto-deducted on every transaction on-chain
- **Multilingual**: 7 languages (FR default, EN, ES, ZH, AR, HI, PT) — full RTL support for Arabic
- **Blockchain reads**: Real BSC Mainnet data via ethers.js with 4-RPC fallback pool
- **Price**: Real DexScreener → CoinGecko fallback → honest "not listed" if no DEX pair

## Security (God-tier)

- `helmet` — security headers (CSP, X-Frame-Options, etc.)
- `express-rate-limit` — 300 req/min global, 10 req/hr partner applications, 30 req/30s blockchain
- `CORS` — properly configured with credentials
- Request size limit: 1MB
- Input validation: Zod on all routes
- SQL injection prevention: Drizzle ORM with parameterized queries

## Database Tables

- `partners` — ecosystem partners with status, reward rates, volumes, wallet addresses
- `user_wallets` — auto-generated wallets per user per ecosystem
- `transactions` — reward, transfer, exchange, burn, fee events

## Frontend Pages (God-tier design)

- `/` — Hero + live on-chain stats + QR code + contract verification panel with copy + BSCScan links
- `/partner/apply` — 5-step wizard with 11 ecosystem type selector, wallet validation, animated steps
- `/partner/dashboard` — Partner-specific KPIs with partner selector
- `/dashboard` — AI Coordinator: 8 metric cards + annual supply progress bar + pending approvals
- `/users` — Explorer with search, total stats, wallet cards with BSCScan links
- `/partners` — Full partner cards with ecosystem icons, volumes, wallet links

## API Endpoints

- `GET /api/stats/overview` — Global KPIs (real DB + real blockchain)
- `GET /api/stats/util-price` — UTIL price (DexScreener → CoinGecko → honest fallback)
- `GET /api/contract/info` — Real BSC Mainnet contract reads (ethers.js)
- `GET /api/partners` — Partner directory
- `POST /api/partners` — Submit partner application
- `POST /api/partners/:id/approve` — Approve partner (admin)
- `POST /api/partners/:id/reject` — Reject partner with reason (admin)
- `GET /api/transactions` — Reward transactions
- `POST /api/transactions/consumption` — Record real consumption event
- `GET /api/stats/rewards-timeline` — Historical rewards chart data

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally
- `pnpm --filter @workspace/omniutil run dev` — run frontend locally
