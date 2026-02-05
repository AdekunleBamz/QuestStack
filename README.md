# QuestStack 🎯

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
npm run test
```

### Deployment

```bash
npm run deploy
```

## Project Structure

```
queststack/
├── contracts/          # Clarity 4 smart contracts
├── frontend/          # Next.js frontend
├── backend/           # Node.js backend & chainhooks
└── scripts/           # Deployment scripts
```

## License

MIT

