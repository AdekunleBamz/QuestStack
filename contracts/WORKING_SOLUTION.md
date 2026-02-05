# ✅ Working Solution - Deploy Contracts Individually

The `clarinet deployments apply` command has syntax issues. Use individual contract publishing instead.

## Run This:

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

# Deploy in dependency order (one at a time)
clarinet contract publish reward-token
clarinet contract publish quest-contract
clarinet contract publish staking-contract
clarinet contract publish governance-contract
```

## Or Use the Script:

```bash
cd /Users/apple/queststack/contracts
./deploy-simple.sh
```

## What This Does:

- `clarinet contract publish` deploys a single contract
- It reads the network from `Clarinet.toml` (mainnet is configured)
- It uses the `CLARINET_MNEMONIC` environment variable
- Each contract will show its deployment address after publishing

## After Deployment:

1. **Copy the contract addresses** from the output
2. **Update backend/.env** with the addresses
3. **Update frontend/.env.local** with the addresses  
4. **Update backend/src/chainhooks/register.ts** with the addresses
5. **Register chainhooks**: `cd backend && npm run register-chainhooks`

## Verify on Explorer:

Check your contracts on: https://explorer.stacks.co
Search for your wallet address to see deployed contracts.

