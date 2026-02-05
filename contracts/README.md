# QuestStack Smart Contracts

Four Clarity 4 smart contracts for the QuestStack platform.

## Contracts

### 1. reward-token.clar
ERC-20-like token for quest rewards.

**Functions:**
- `transfer` - Transfer tokens
- `mint` - Mint new tokens (owner only)
- `burn` - Burn tokens
- `approve` - Approve spender
- `transfer-from` - Transfer from approved account

**Clarity 4 Features:**
- Uses `restrict-assets?` for secure transfers

### 2. quest-contract.clar
Manages quest creation, completion, and rewards.

**Functions:**
- `create-quest` - Create a new quest
- `complete-quest` - Mark quest as completed
- `claim-reward` - Claim reward for completed quest
- `cancel-quest` - Cancel a quest (creator only)

**Clarity 4 Features:**
- Uses `contract-hash?` to verify reward token contract
- Uses `stacks-block-time` for deadline checking

### 3. staking-contract.clar
Token staking for premium quest access.

**Functions:**
- `stake` - Stake tokens
- `unstake` - Unstake tokens
- `claim-staking-rewards` - Claim staking rewards

**Clarity 4 Features:**
- Uses `contract-hash?` to verify token contract
- Uses `restrict-assets?` for secure transfers

### 4. governance-contract.clar
DAO-style governance for platform parameters.

**Functions:**
- `propose` - Create a governance proposal
- `vote` - Vote on a proposal
- `execute-proposal` - Execute a passed proposal

**Clarity 4 Features:**
- Uses `stacks-block-time` for voting deadlines
- Uses `contract-hash?` to verify contracts

## Deployment

Deploy to MAINNET using Clarinet:

```bash
clarinet deployments apply -p mainnet
```

## Testing

```bash
clarinet test
```

