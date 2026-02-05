# Simple Deploy - Try These Commands

The error suggests Clarinet is misinterpreting the `-p mainnet` flag. Try these alternatives:

## Option 1: Deploy Without Profile Flag

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet deployments apply mainnet
```

(Remove the `-p` flag, just use `mainnet` directly)

## Option 2: Use Contract Publish

```bash
cd /Users/apple/queststack/contracts
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

# Deploy each contract
clarinet contract publish reward-token
clarinet contract publish quest-contract
clarinet contract publish staking-contract
clarinet contract publish governance-contract
```

## Option 3: Use DEPLOYER_MNEMONIC

```bash
export DEPLOYER_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
clarinet deployments apply mainnet
```

## Option 4: Check Clarinet Help

```bash
clarinet deployments --help
clarinet contract --help
```

This will show you the exact syntax your version expects.

## Quick Test

Run the test script to see what works:

```bash
cd /Users/apple/queststack/contracts
./test-deploy.sh
```

This will try different command variations and show which one works.

