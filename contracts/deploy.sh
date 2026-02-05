#!/bin/bash
# QuestStack Mainnet Deployment Script

# Set your mnemonic as environment variable
export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

# Navigate to contracts directory
cd "$(dirname "$0")"

# Deploy to mainnet
echo "🚀 Deploying QuestStack contracts to MAINNET..."
echo ""

# Deploy in order (respecting dependencies)
echo "1. Deploying reward-token..."
clarinet contract deploy reward-token --mainnet

echo "2. Deploying quest-contract..."
clarinet contract deploy quest-contract --mainnet

echo "3. Deploying staking-contract..."
clarinet contract deploy staking-contract --mainnet

echo "4. Deploying governance-contract..."
clarinet contract deploy governance-contract --mainnet

echo ""
echo "✅ Deployment complete!"

