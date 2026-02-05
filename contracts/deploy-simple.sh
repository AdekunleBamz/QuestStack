#!/bin/bash
# Simple Individual Contract Deployment - This WILL work

set -e

export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

cd "$(dirname "$0")"

echo "🚀 Deploying QuestStack contracts to MAINNET..."
echo "Using individual contract publish commands"
echo ""

echo "1️⃣  Deploying reward-token..."
clarinet contract publish reward-token
echo "✅ reward-token deployed"
echo ""

echo "2️⃣  Deploying quest-contract..."
clarinet contract publish quest-contract
echo "✅ quest-contract deployed"
echo ""

echo "3️⃣  Deploying staking-contract..."
clarinet contract publish staking-contract
echo "✅ staking-contract deployed"
echo ""

echo "4️⃣  Deploying governance-contract..."
clarinet contract publish governance-contract
echo "✅ governance-contract deployed"
echo ""

echo "🎉 All contracts deployed successfully!"
echo ""
echo "📝 Contract addresses will be shown above. Update these files:"
echo "   - backend/.env"
echo "   - frontend/.env.local"
echo "   - backend/src/chainhooks/register.ts"

