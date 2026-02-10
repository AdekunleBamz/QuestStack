# QuestStack Frontend

Next.js frontend for the QuestStack dApp

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: CSS with CSS Variables
- **Wallet**: @stacks/connect
- **State**: React Hooks

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── WalletConnect.tsx  # Wallet connection
│   ├── TransactionButton.tsx
│   ├── QuestCard.tsx
│   ├── StakingPanel.tsx
│   └── GovernancePanel.tsx
├── hooks/                 # Custom React hooks
│   ├── useStacksConnect.ts
│   ├── useQuests.ts
│   ├── useStaking.ts
│   └── useGovernance.ts
├── services/             # API services
│   └── contractService.ts
└── utils/               # Utilities
    ├── transactionBuilder.ts
    └── formatters.ts
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run linting
npm run lint
```

## Environment Variables

```env
NEXT_PUBLIC_QUEST_CONTRACT=SP...
NEXT_PUBLIC_REWARD_TOKEN_CONTRACT=SP...
NEXT_PUBLIC_STAKING_CONTRACT=SP...
NEXT_PUBLIC_GOVERNANCE_CONTRACT=SP...
```

## Features

- Wallet connection with Hiro Wallet
- Quest creation and completion
- Token staking with premium access
- DAO governance participation
