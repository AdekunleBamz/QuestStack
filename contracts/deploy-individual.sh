#!/bin/bash
# Individual Contract Deployment Script for MAINNET

set -e

# Set your mnemonic
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

echo "🚀 Deploying QuestStack contracts to MAINNET..."
echo ""

# Get the account address from mnemonic (Clarinet will handle this)
cd "$(dirname "$0")"

# Deploy contracts one by one in dependency order
echo "1️⃣  Deploying reward-token..."
clarinet contract publish reward-token --mainnet || {
    echo "❌ Failed to deploy reward-token"
    exit 1
}

echo ""
echo "2️⃣  Deploying quest-contract..."
clarinet contract publish quest-contract --mainnet || {
    echo "❌ Failed to deploy quest-contract"
    exit 1
}

echo ""
echo "3️⃣  Deploying staking-contract..."
clarinet contract publish staking-contract --mainnet || {
    echo "❌ Failed to deploy staking-contract"
    exit 1
}

echo ""
echo "4️⃣  Deploying governance-contract..."
clarinet contract publish governance-contract --mainnet || {
    echo "❌ Failed to deploy governance-contract"
    exit 1
}

echo ""
echo "✅ All contracts deployed successfully!"
echo ""
echo "📝 Next steps:"
echo "1. Update contract addresses in backend/.env"
echo "2. Update contract addresses in frontend/.env.local"
echo "3. Update contract addresses in backend/src/chainhooks/register.ts"
echo "4. Register chainhooks: cd backend && npm run register-chainhooks"

