# Get Private Key from Mnemonic

Since Clarinet commands aren't working as expected, let's use the TypeScript deployment script which requires a private key.

## Convert Mnemonic to Private Key

### Option 1: Using Stacks.js (Recommended)

Create a temporary script:

```bash
cd /Users/apple/queststack
npm install @stacks/wallet-sdk
```

Then create `get-key.js`:

```javascript
const { generateWallet } = require('@stacks/wallet-sdk');

const mnemonic = "tourist chief old shadow clap injury join spoil birth copper valid skate";
const wallet = generateWallet(mnemonic);
const privateKey = wallet.privateKey;

console.log("Private Key:", privateKey);
```

Run it:
```bash
node get-key.js
```

### Option 2: Use Online Tool (Less Secure)

⚠️ **Only use if you trust the tool and are using a test wallet**

1. Go to: https://iancoleman.io/bip39/
2. Enter your mnemonic
3. Select "Stacks" as the coin
4. Copy the private key from the first account

### Option 3: Use Hiro Wallet

1. Import your mnemonic into Hiro Wallet
2. Export the private key from wallet settings

## Then Deploy

Once you have the private key:

```bash
cd /Users/apple/queststack
export DEPLOYER_PRIVATE_KEY="your-private-key-here"
cd scripts
npm install
tsx deploy.ts
```

