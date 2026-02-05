# Fix for Clarinet Deployment Error

If you're getting the error:
```
error: /Users/apple/queststack/contracts/mainnet syntax incorrect
unable to read file /Users/apple/queststack/contracts/mainnet
```

## Solution 1: Use Environment Variable (Recommended)

Instead of using the settings file, use an environment variable:

```bash
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"
cd contracts
clarinet deployments apply -p mainnet
```

## Solution 2: Check Clarinet Version

Some versions of Clarinet handle settings differently. Check your version:

```bash
clarinet --version
```

## Solution 3: Use Settings File Path Explicitly

Try specifying the settings file:

```bash
cd contracts
clarinet deployments apply -p mainnet --settings settings/Mainnet.toml
```

## Solution 4: Manual Deployment Script

If Clarinet continues to have issues, use the TypeScript deployment script:

```bash
# Set environment variable
export DEPLOYER_PRIVATE_KEY="your-private-key-from-mnemonic"

# Run deployment script
cd scripts
npm install
tsx deploy.ts
```

## Get Private Key from Mnemonic

If you need to convert mnemonic to private key, you can use:

```bash
# Using stacks.js or similar tool
# Or use an online tool (be careful with security!)
```

The easiest solution is **Solution 1** - using the environment variable.

