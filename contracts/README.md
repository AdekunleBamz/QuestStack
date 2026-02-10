# QuestStack Smart Contracts

Clarity smart contracts for QuestStack dApp on Stacks blockchain

## Contracts

### quest-contract.clar
Main quest management contract for creating, completing, and claiming rewards

### staking-contract.clar
Token staking contract with premium access and reward distribution

### governance-contract.clar
DAO governance contract for proposal creation and voting

### reward-token.clar
ERC-20-like reward token (QST)

## Deployment

```bash
# Deploy to testnet
clarinet testnet deploy

# Deploy to mainnet
clarinet mainnet deploy
```

## Testing

```bash
# Run unit tests
clarinet test

# Check contract syntax
clarinet check
```

## Constants

- Quest statuses: active(1), completed(2), cancelled(3)
- Proposal statuses: pending(1), active(2), passed(3), rejected(4), executed(5)
- Token decimals: 6
