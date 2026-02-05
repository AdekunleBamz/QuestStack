/**
 * Deployment script using @stacks/transactions
 * Deploys all 4 contracts to MAINNET
 */

import {
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  StacksMainnet,
} from '@stacks/transactions';
import * as fs from 'fs';
import * as path from 'path';

const network = new StacksMainnet();

// Read contract files
const contractsDir = path.join(__dirname, '../contracts/contracts');

async function deployContract(contractName: string, senderKey: string) {
  const contractPath = path.join(contractsDir, `${contractName}.clar`);
  const contractCode = fs.readFileSync(contractPath, 'utf-8');

  const tx = await makeContractDeploy({
    contractName,
    codeBody: contractCode,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    fee: 2000,
  });

  const result = await broadcastTransaction(tx, network);
  console.log(`✅ Deployed ${contractName}:`, result);
  return result;
}

// Main deployment function
async function deployAll() {
  const senderKey = process.env.DEPLOYER_PRIVATE_KEY;
  if (!senderKey) {
    throw new Error('DEPLOYER_PRIVATE_KEY environment variable required');
  }

  console.log('🚀 Deploying QuestStack contracts to MAINNET...\n');

  // Deploy in order (respecting dependencies)
  await deployContract('reward-token', senderKey);
  await deployContract('quest-contract', senderKey);
  await deployContract('staking-contract', senderKey);
  await deployContract('governance-contract', senderKey);

  console.log('\n✅ All contracts deployed!');
}

if (require.main === module) {
  deployAll().catch(console.error);
}

export { deployAll };

