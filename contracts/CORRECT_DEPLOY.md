# Correct Deployment Command

Based on the error, `clarinet deployments apply` doesn't accept `mainnet` as a positional argument.

## ✅ Correct Syntax

The `-p` flag needs to come BEFORE `apply`:

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet deployments -p mainnet apply
```

OR use the flag with `apply`:

```bash
clarinet deployments apply --profile mainnet
```

## Alternative: Deploy Contracts Individually

If the above doesn't work, deploy each contract:

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

# Deploy in dependency order
clarinet contract publish reward-token
clarinet contract publish quest-contract
clarinet contract publish staking-contract
clarinet contract publish governance-contract
```

## Check Available Options

```bash
clarinet deployments apply --help
```

This will show you the exact flags your version supports.

