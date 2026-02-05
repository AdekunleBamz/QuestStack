# Final Deployment Solution

## Option 1: Try --mainnet Flag

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet deployments apply --mainnet
```

## Option 2: Use TypeScript Deployment Script (Most Reliable)

This uses `@stacks/transactions` directly and is more reliable.

### Step 1: Get Private Key from Mnemonic

```bash
cd /Users/apple/queststack
npm install @stacks/wallet-sdk
node get-key.js
```

This will output your private key. Copy it.

### Step 2: Deploy Contracts

```bash
export DEPLOYER_PRIVATE_KEY="your-private-key-from-step-1"
cd scripts
npm install
tsx deploy.ts
```

This will deploy all 4 contracts in the correct order.

## Option 3: Manual Deployment with Stacks.js

If the above don't work, you can deploy manually using the Stacks.js library in a Node.js script.

