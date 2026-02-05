# 🚀 Deploy QuestStack to MAINNET - Working Solution

Since Clarinet commands are having issues, use the TypeScript deployment script with `@stacks/transactions`.

## Step 1: Convert Mnemonic to Private Key

```bash
cd /Users/apple/queststack

# Install wallet SDK
npm install @stacks/wallet-sdk

# Generate private key
node get-key.js
```

This will output your **private key**. Copy it!

## Step 2: Deploy Contracts

```bash
# Set the private key from Step 1
export DEPLOYER_PRIVATE_KEY="your-private-key-here"

# Install dependencies and deploy
cd scripts
npm install
tsx deploy.ts
```

This will deploy all 4 contracts in order:
1. reward-token
2. quest-contract  
3. staking-contract
4. governance-contract

## Step 3: Copy Contract Addresses

After deployment, you'll see the contract addresses. Update these files:

1. **backend/.env** - Add contract addresses
2. **frontend/.env.local** - Add contract addresses
3. **backend/src/chainhooks/register.ts** - Update contract addresses

## Step 4: Register Chainhooks

```bash
cd backend
npm install
npm run register-chainhooks
```

## Verify Deployment

Check your contracts on: https://explorer.stacks.co
Search for your wallet address.

---

**Note:** The `get-key.js` script uses your mnemonic to generate the private key. Keep both secure!

