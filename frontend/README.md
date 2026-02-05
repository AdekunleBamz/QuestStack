# QuestStack Frontend

Next.js frontend with full @stacks/connect and @stacks/transactions integration.

## Features

- **Wallet Connection** - Uses @stacks/connect for wallet integration
- **Transaction Building** - Uses @stacks/transactions for all contract calls
- **Real-time Updates** - Displays on-chain data
- **Quest Management** - Create, complete, and claim quests
- **Staking Interface** - Stake/unstake tokens
- **Governance** - Create proposals and vote

## Setup

```bash
npm install
cp .env.example .env.local
# Update .env.local with contract addresses
```

## Environment Variables

- `NEXT_PUBLIC_STACKS_NETWORK` - mainnet
- `NEXT_PUBLIC_STACKS_API_URL` - https://api.mainnet.hiro.so
- `NEXT_PUBLIC_QUEST_CONTRACT` - Deployed quest contract
- `NEXT_PUBLIC_REWARD_TOKEN_CONTRACT` - Deployed token contract
- `NEXT_PUBLIC_STAKING_CONTRACT` - Deployed staking contract
- `NEXT_PUBLIC_GOVERNANCE_CONTRACT` - Deployed governance contract
- `NEXT_PUBLIC_API_URL` - Backend API URL

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
npm start
```

## Key Files Using @stacks/connect

- `src/hooks/useStacksConnect.ts` - Wallet connection hook
- `src/components/WalletConnect.tsx` - Wallet connection component
- `src/app/page.tsx` - Main page with Connect provider

## Key Files Using @stacks/transactions

- `src/hooks/useTransactions.ts` - Transaction building hook
- `src/utils/transactionBuilder.ts` - Transaction builder utilities
- `src/services/contractService.ts` - Read-only contract calls
- `src/components/TransactionButton.tsx` - Reusable transaction button
- `src/components/QuestCard.tsx` - Quest interaction component
- `src/components/StakingPanel.tsx` - Staking interface
- `src/components/GovernancePanel.tsx` - Governance interface

## Components

- `WalletConnect` - Connect Stacks wallet
- `QuestCard` - Display and interact with quests
- `StakingPanel` - Stake/unstake tokens
- `GovernancePanel` - Create proposals and vote
- `TransactionButton` - Reusable transaction execution button

