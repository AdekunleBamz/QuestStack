#!/bin/bash
# Test deployment commands

export CLARINET_MNEMONIC="tourist chief old shadow clap injury join spoil birth copper valid skate"

echo "Testing Clarinet commands..."
echo ""

# Try different command variations
echo "1. Try: clarinet contract publish reward-token"
clarinet contract publish reward-token 2>&1 | head -5

echo ""
echo "2. Try: clarinet deploy --mainnet"
clarinet deploy --mainnet 2>&1 | head -5

echo ""
echo "3. Try: clarinet deployments apply mainnet"
clarinet deployments apply mainnet 2>&1 | head -5

