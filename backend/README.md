# QuestStack Backend

Backend service for handling Chainhook webhooks and transaction services.

## Features

- **9 Chainhook Webhooks** - Handles all on-chain events
- **Transaction Services** - Uses @stacks/transactions for transaction monitoring
- **Express API** - RESTful API for webhook endpoints

## Setup

```bash
npm install
cp .env.example .env
# Update .env with your configuration
```

## Environment Variables

- `CHAINHOOKS_API_KEY` - Hiro Chainhooks API key
- `CHAINHOOKS_BASE_URL` - https://api.mainnet.hiro.so
- `QUEST_CONTRACT_ADDRESS` - Deployed quest contract address
- `REWARD_TOKEN_CONTRACT_ADDRESS` - Deployed token contract address
- `STAKING_CONTRACT_ADDRESS` - Deployed staking contract address
- `GOVERNANCE_CONTRACT_ADDRESS` - Deployed governance contract address
- `WEBHOOK_BASE_URL` - Your backend URL for webhooks
- `WEBHOOK_SECRET` - Secret for webhook authentication
- `PORT` - Server port (default: 3001)

## Register Chainhooks

```bash
npm run register-chainhooks
```

This registers all 9 chainhooks:
1. Quest Created
2. Quest Completed
3. Reward Claimed
4. Token Mint
5. Token Transfer
6. Stake Deposited
7. Stake Withdrawn
8. Proposal Created
9. Vote Cast

## Run Server

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Webhook Endpoints

All webhooks are POST endpoints:
- `/webhooks/quest-created`
- `/webhooks/quest-completed`
- `/webhooks/reward-claimed`
- `/webhooks/token-mint`
- `/webhooks/token-transfer`
- `/webhooks/stake-deposited`
- `/webhooks/stake-withdrawn`
- `/webhooks/proposal-created`
- `/webhooks/vote-cast`

## Transaction Service

Uses `@stacks/transactions` for:
- Broadcasting transactions
- Monitoring transaction status
- Waiting for confirmations

