#!/bin/bash
# Deploy using @stacks/transactions (TypeScript script)

cd "$(dirname "$0")/.."

echo "🚀 Deploying QuestStack contracts using @stacks/transactions..."
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Set your private key (you'll need to convert mnemonic to private key)
# For now, we'll use the mnemonic and convert it
echo "⚠️  Note: You need to convert your mnemonic to a private key"
echo "   You can use: https://www.stacks.co/explorer/address/ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM"
echo "   Or use a tool like: npm install -g @stacks/cli"
echo ""
echo "Once you have your private key, set it:"
echo "export DEPLOYER_PRIVATE_KEY='your-private-key-here'"
echo ""
echo "Then run:"
echo "cd scripts && npm install && tsx deploy.ts"

