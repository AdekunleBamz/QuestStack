# Quick Deploy Guide

## The Error You're Seeing

```
error: /Users/apple/queststack/contracts/mainnet syntax incorrect
unable to read file /Users/apple/queststack/contracts/mainnet
```

This happens because Clarinet is looking for a deployment file in the wrong location.

## ✅ Solution: Use Environment Variable

Run this command in your terminal:

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet deployments apply -p mainnet
```

Or use the deployment script:

```bash
cd /Users/apple/queststack/contracts
./deploy.sh
```

## Alternative: Deploy Contracts Individually

If the above doesn't work, deploy each contract individually:

```bash
cd /Users/apple/queststack/contracts

# Set mnemonic
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

# Deploy in order
clarinet contract deploy reward-token --mainnet
clarinet contract deploy quest-contract --mainnet  
clarinet contract deploy staking-contract --mainnet
clarinet contract deploy governance-contract --mainnet
```

## Verify Deployment

After deployment, check your contracts on:
- https://explorer.stacks.co
- Search for your wallet address

## Update Contract Addresses

After deployment, update these files with your new contract addresses:
- `backend/.env`
- `frontend/.env.local`
- `backend/src/chainhooks/register.ts`

