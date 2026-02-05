# Deploy Now - Working Solution

## The Problem
Clarinet's `deployments apply -p mainnet` is looking for a file that doesn't exist.

## ✅ Working Solution: Deploy Contracts Individually

Run these commands one by one:

```bash
cd /Users/apple/queststack/contracts

# Set mnemonic
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

# Deploy in dependency order:
clarinet contract publish reward-token --mainnet
clarinet contract publish quest-contract --mainnet
clarinet contract publish staking-contract --mainnet
clarinet contract publish governance-contract --mainnet
```

## Or Use the Script

```bash
cd /Users/apple/queststack/contracts
./deploy-individual.sh
```

## Alternative: Use DEPLOYER_MNEMONIC

Some Clarinet versions use `DEPLOYER_MNEMONIC` instead:

```bash
export DEPLOYER_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet contract publish reward-token --mainnet
```

## If Contract Publish Doesn't Work

Try without the `--mainnet` flag (it should detect from Clarinet.toml):

```bash
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet contract publish reward-token
```

## Check Your Clarinet Version

```bash
clarinet --version
```

Different versions may have different command syntax.

