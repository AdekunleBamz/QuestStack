/**
 * Convert mnemonic to private key for deployment
 * Run: node get-key.js
 */

const { generateWallet } = require('@stacks/wallet-sdk');

const mnemonic = "tourist chief old shadow clap injury join spoil birth copper valid skate";

try {
  const wallet = generateWallet(mnemonic);
  const privateKey = wallet.privateKey;
  const address = wallet.address;
  
  console.log("\n✅ Private Key Generated:");
  console.log("Private Key:", privateKey);
  console.log("Address:", address);
  console.log("\n⚠️  Keep this private key secure!");
  console.log("Set it as: export DEPLOYER_PRIVATE_KEY=\"" + privateKey + "\"");
  console.log("\nThen deploy with: cd scripts && npm install && tsx deploy.ts\n");
} catch (error) {
  console.error("Error:", error.message);
  console.log("\nTry installing: npm install @stacks/wallet-sdk");
}

