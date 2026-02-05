# QuestStack Project Summary

## Overview

QuestStack is a decentralized Quest & Reward Platform built on Stacks MAINNET using:
- **4 Clarity 4 Smart Contracts**
- **9 Hiro Chainhooks**
- **@stacks/connect** for wallet integration
- **@stacks/transactions** for transaction building

## Project Structure

```
queststack/
├── contracts/              # 4 Clarity 4 smart contracts
│   ├── contracts/
│   │   ├── reward-token.clar
│   │   ├── quest-contract.clar
│   │   ├── staking-contract.clar
│   │   └── governance-contract.clar
│   └── Clarinet.toml
├── backend/                # Node.js backend
│   ├── src/
│   │   ├── chainhooks/
│   │   │   └── register.ts      # 9 chainhook registrations
│   │   ├── services/
│   │   │   └── transactionService.ts  # @stacks/transactions
│   │   └── index.ts              # Webhook handler
│   └── package.json
├── frontend/              # Next.js frontend
│   ├── src/
│   │   ├── hooks/
│   │   │   ├── useStacksConnect.ts    # @stacks/connect
│   │   │   └── useTransactions.ts     # @stacks/transactions
│   │   ├── components/
│   │   │   ├── WalletConnect.tsx       # @stacks/connect
│   │   │   ├── QuestCard.tsx           # @stacks/transactions
│   │   │   ├── TransactionButton.tsx   # @stacks/transactions
│   │   │   ├── StakingPanel.tsx        # @stacks/transactions
│   │   │   └── GovernancePanel.tsx     # @stacks/transactions
│   │   ├── services/
│   │   │   └── contractService.ts      # @stacks/transactions
│   │   └── utils/
│   │       └── transactionBuilder.ts   # @stacks/transactions
│   └── package.json
└── scripts/
    └── deploy.ts          # Deployment using @stacks/transactions
```

## Smart Contracts (4 Clarity 4 Contracts)

### 1. reward-token.clar
- ERC-20-like token
- Functions: transfer, mint, burn, approve, transfer-from
- Uses: `restrict-assets?`

### 2. quest-contract.clar
- Quest management
- Functions: create-quest, complete-quest, claim-reward, cancel-quest
- Uses: `contract-hash?`, `stacks-block-time`

### 3. staking-contract.clar
- Token staking
- Functions: stake, unstake, claim-staking-rewards
- Uses: `contract-hash?`, `restrict-assets?`

### 4. governance-contract.clar
- DAO governance
- Functions: propose, vote, execute-proposal
- Uses: `stacks-block-time`, `contract-hash?`

## Chainhooks (9 Hooks)

All registered on MAINNET:

1. **Quest Created** - Monitors `create-quest`
2. **Quest Completed** - Monitors `complete-quest`
3. **Reward Claimed** - Monitors `claim-reward`
4. **Token Mint** - Monitors `mint`
5. **Token Transfer** - Monitors `transfer` and `transfer-from`
6. **Stake Deposited** - Monitors `stake`
7. **Stake Withdrawn** - Monitors `unstake`
8. **Proposal Created** - Monitors `propose`
9. **Vote Cast** - Monitors `vote`

## @stacks/connect Usage

Files using `@stacks/connect`:
- `frontend/src/hooks/useStacksConnect.ts`
- `frontend/src/components/WalletConnect.tsx`
- `frontend/src/app/page.tsx`
- `frontend/src/components/StakingPanel.tsx`
- `frontend/src/components/GovernancePanel.tsx`
- `frontend/src/components/TransactionButton.tsx`

## @stacks/transactions Usage

Files using `@stacks/transactions`:
- `frontend/src/hooks/useTransactions.ts`
- `frontend/src/utils/transactionBuilder.ts`
- `frontend/src/services/contractService.ts`
- `frontend/src/components/QuestCard.tsx`
- `frontend/src/components/TransactionButton.tsx`
- `frontend/src/components/StakingPanel.tsx`
- `frontend/src/components/GovernancePanel.tsx`
- `backend/src/services/transactionService.ts`
- `scripts/deploy.ts`

## GitHub Activity

This project includes extensive use of:
- ✅ `@stacks/connect` - Multiple files
- ✅ `@stacks/transactions` - Multiple files
- ✅ Clarity 4 smart contracts - 4 contracts
- ✅ Hiro Chainhooks - 9 hooks
- ✅ Mainnet deployment ready

## Next Steps

1. Deploy contracts to MAINNET
2. Register chainhooks
3. Deploy backend
4. Deploy frontend
5. Start using QuestStack!

## Important Notes

- **MAINNET ONLY** - No test data
- All transactions are real
- All chainhooks monitor MAINNET
- Production-ready code

