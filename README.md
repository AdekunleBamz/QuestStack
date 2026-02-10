# QuestStack 🎯

[![CI](https://github.com/AdekunleBamz/QuestStack/actions/workflows/ci.yml/badge.svg)](https://github.com/AdekunleBamz/QuestStack/actions)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Clarity](https://img.shields.io/badge/Clarity-4.0-blue.svg)](https://docs.stacks.co/clarity)
[![Stacks](https://img.shields.io/badge/Stacks-2.1-blue.svg)](https://stacks.co)


A decentralized Quest & Reward Platform built on Stacks blockchain using Clarity 4 smart contracts and Hiro Chainhooks.

## Features

- 🎮 **Quest System**: Create, complete, and claim rewards from on-chain quests
- 🪙 **Reward Tokens**: ERC-20-like token for quest rewards
- 💰 **Staking**: Stake tokens to unlock premium quests
- 🗳️ **Governance**: Vote on quest parameters and platform upgrades
- 🔔 **Real-time Updates**: 9 Chainhooks monitoring all on-chain events
- 🔐 **Wallet Integration**: Full @stacks/connect and @stacks/transactions support

## Architecture

### Smart Contracts (4 Clarity 4 Contracts)

1. **quest-contract** - Quest creation, completion, and reward management
2. **reward-token** - ERC-20-like reward token
3. **staking-contract** - Token staking for premium quests
4. **governance-contract** - DAO-style governance

### Chainhooks (9 Hooks)

1. Quest Created Hook
2. Quest Completed Hook
3. Reward Claimed Hook
4. Token Mint Hook
5. Token Transfer Hook
6. Stake Deposited Hook
7. Stake Withdrawn Hook
8. Proposal Created Hook
9. Vote Cast Hook

## Tech Stack

- **Smart Contracts**: Clarity 4 (Clarinet)
- **Frontend**: Next.js, React, @stacks/connect, @stacks/transactions
- **Backend**: Node.js, Express
- **Chainhooks**: @hirosystems/chainhooks-client

## Getting Started

### Prerequisites

- Node.js 18+
- Clarinet
- Stacks wallet (Hiro Wallet or Xverse)

### Installation

```bash
npm install
```

### Development

```bash
# Start frontend and backend
npm run dev

# Or individually
npm run dev:frontend
npm run dev:backend
```

### Testing

```bash
# Test smart contracts
npm run test

# Run linting
npm run lint

# Type checking
npm run typecheck
```

### Deployment

```bash
# Deploy contracts
npm run deploy

# Build all
npm run build
```

## Project Structure

```
queststack/
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions CI/CD
├── contracts/
│   ├── contracts/
│   │   ├── quest-contract.clar
│   │   ├── reward-token.clar
│   │   ├── staking-contract.clar
│   │   └── governance-contract.clar
│   └── Clarinet.toml
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   └── globals.css
│   │   ├── components/
│   │   │   ├── WalletConnect.tsx
│   │   │   ├── QuestCard.tsx
│   │   │   ├── TransactionButton.tsx
│   │   │   ├── StakingPanel.tsx
│   │   │   └── GovernancePanel.tsx
│   │   ├── hooks/
│   │   │   ├── useStacksConnect.ts
│   │   │   └── useTransactions.ts
│   │   ├── services/
│   │   │   └── contractService.ts
│   │   └── utils/
│   │       └── transactionBuilder.ts
│   └── package.json
├── backend/
│   ├── src/
│   │   ├── index.ts             # Express server
│   │   ├── chainhooks/
│   │   │   └── register.ts     # Chainhook registration
│   │   └── services/
│   │       └── transactionService.ts
│   └── package.json
├── scripts/
│   └── deploy.ts               # Deployment scripts
└── package.json
```

## Environment Variables

### Frontend

```env
NEXT_PUBLIC_QUEST_CONTRACT=SP...
NEXT_PUBLIC_REWARD_TOKEN_CONTRACT=SP...
NEXT_PUBLIC_STAKING_CONTRACT=SP...
NEXT_PUBLIC_GOVERNANCE_CONTRACT=SP...
```

### Backend

```env
PORT=3001
WEBHOOK_SECRET=your-webhook-secret
QUEST_CONTRACT_ADDRESS=SP...
REWARD_TOKEN_CONTRACT_ADDRESS=SP...
STAKING_CONTRACT_ADDRESS=SP...
GOVERNANCE_CONTRACT_ADDRESS=SP...
WEBHOOK_BASE_URL=https://your-backend.com
CHAINHOOKS_API_KEY=your-api-key
```

## API Endpoints

### Health Checks

- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed status with memory usage

### Webhooks

All chainhook endpoints require Bearer token authentication:

- `POST /webhooks/quest-created`
- `POST /webhooks/quest-completed`
- `POST /webhooks/reward-claimed`
- `POST /webhooks/token-mint`
- `POST /webhooks/token-transfer`
- `POST /webhooks/stake-deposited`
- `POST /webhooks/stake-withdrawn`
- `POST /webhooks/proposal-created`
- `POST /webhooks/vote-cast`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## Security

For security issues, please contact the maintainers directly.

## License

MIT
