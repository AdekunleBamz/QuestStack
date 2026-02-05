# Deployment Setup Guide

## Where to Put Your Mnemonic

Your mnemonic (seed phrase) goes in:

**`contracts/settings/Mainnet.toml`**

This file is already in `.gitignore` so it won't be committed to GitHub.

## Setup Steps

1. **Copy the example file:**
   ```bash
   cd contracts
   cp settings/Mainnet.toml.example settings/Mainnet.toml
   ```

2. **Edit `settings/Mainnet.toml` and add your mnemonic:**
   ```toml
   [network]
   name = "mainnet"
   node_url = "https://api.mainnet.hiro.so"
   
   mnemonic = "your twelve word mnemonic phrase goes here separated by spaces"
   ```

3. **Verify it's gitignored:**
   ```bash
   git status
   # settings/Mainnet.toml should NOT appear
   ```

4. **Deploy to mainnet:**
   ```bash
   clarinet deployments apply -p mainnet
   ```

## Security Notes

- ✅ `settings/Mainnet.toml` is in `.gitignore` - it won't be committed
- ✅ Never share your mnemonic
- ✅ Use a wallet with only the STX needed for deployment
- ✅ Consider using a separate deployment wallet

## Alternative: Environment Variable

You can also use an environment variable:

```bash
export CLARINET_MNEMONIC="your mnemonic here"
clarinet deployments apply -p mainnet
```

But the `settings/Mainnet.toml` file is the recommended approach.

