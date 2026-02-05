# QuestStack Deployment Guide - MAINNET

This guide covers deploying QuestStack to Stacks MAINNET.

## Prerequisites

1. **Clarinet** installed and configured
2. **Node.js 18+** installed
3. **Stacks wallet** with STX for deployment fees
4. **Chainhooks API key** from Hiro

## Step 1: Deploy Smart Contracts

### Update Contract Addresses

After deployment, update these in:
- `backend/.env`
- `frontend/.env.local`
- `backend/src/chainhooks/register.ts`

### Deploy Contracts

```bash
cd contracts
clarinet deployments apply -p mainnet
```

Deploy in this order:
1. `reward-token` (no dependencies)
2. `quest-contract` (depends on reward-token)
3. `staking-contract` (depends on reward-token)
4. `governance-contract` (depends on quest-contract and reward-token)

## Step 2: Register Chainhooks

### Configure Environment

```bash
cd backend
cp .env.example .env
```

Update `.env` with:
- `CHAINHOOKS_API_KEY` - Your Hiro Chainhooks API key
- Contract addresses from Step 1
- `WEBHOOK_BASE_URL` - Your backend URL

### Register All 9 Chainhooks

```bash
npm install
npm run register-chainhooks
```

This will register:
1. Quest Created Hook
2. Quest Completed Hook
3. Reward Claimed Hook
4. Token Mint Hook
5. Token Transfer Hook
6. Stake Deposited Hook
7. Stake Withdrawn Hook
8. Proposal Created Hook
9. Vote Cast Hook

## Step 3: Deploy Backend

### Setup

```bash
cd backend
npm install
```

### Configure

Update `.env` with your configuration.

### Deploy

Deploy to your hosting provider (e.g., Railway, Render, AWS).

Ensure the webhook endpoints are publicly accessible:
- `/webhooks/quest-created`
- `/webhooks/quest-completed`
- `/webhooks/reward-claimed`
- `/webhooks/token-mint`
- `/webhooks/token-transfer`
- `/webhooks/stake-deposited`
- `/webhooks/stake-withdrawn`
- `/webhooks/proposal-created`
- `/webhooks/vote-cast`

## Step 4: Deploy Frontend

### Setup

```bash
cd frontend
npm install
```

### Configure

Create `.env.local`:
```
NEXT_PUBLIC_STACKS_NETWORK=mainnet
NEXT_PUBLIC_STACKS_API_URL=https://api.mainnet.hiro.so
NEXT_PUBLIC_QUEST_CONTRACT=SP...your-contract...
NEXT_PUBLIC_REWARD_TOKEN_CONTRACT=SP...your-contract...
NEXT_PUBLIC_STAKING_CONTRACT=SP...your-contract...
NEXT_PUBLIC_GOVERNANCE_CONTRACT=SP...your-contract...
NEXT_PUBLIC_API_URL=https://your-backend-url.com
```

### Build and Deploy

```bash
npm run build
npm run start
```

Deploy to Vercel, Netlify, or your preferred hosting.

## Verification

1. Check contracts on [Stacks Explorer](https://explorer.stacks.co)
2. Verify chainhooks in Hiro dashboard
3. Test webhook endpoints
4. Test frontend wallet connection

## Important Notes

- All operations are on **MAINNET** - use real STX
- No test/demo data - everything is production
- Keep API keys secure
- Monitor chainhook webhooks for errors

