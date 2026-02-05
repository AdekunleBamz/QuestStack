/**
 * Register all 9 Chainhooks for QuestStack on MAINNET
 * Uses @hirosystems/chainhooks-client
 */

import { ChainhooksClient, CHAINHOOKS_BASE_URL, ChainhookDefinition } from '@hirosystems/chainhooks-client';
import * as dotenv from 'dotenv';

dotenv.config();

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet, // https://api.mainnet.hiro.so
  apiKey: process.env.CHAINHOOKS_API_KEY!,
});

// Contract addresses - UPDATE THESE AFTER DEPLOYMENT
const QUEST_CONTRACT = process.env.QUEST_CONTRACT_ADDRESS || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.REWARD_TOKEN_CONTRACT_ADDRESS || 'SP...';
const STAKING_CONTRACT = process.env.STAKING_CONTRACT_ADDRESS || 'SP...';
const GOVERNANCE_CONTRACT = process.env.GOVERNANCE_CONTRACT_ADDRESS || 'SP...';

// Webhook endpoint - UPDATE WITH YOUR BACKEND URL
const WEBHOOK_BASE_URL = process.env.WEBHOOK_BASE_URL || 'https://your-backend.com/webhooks';

async function registerChainhook(definition: ChainhookDefinition) {
  try {
    const result = await client.registerChainhook(definition);
    console.log(`✅ Registered: ${definition.name} - UUID: ${result.uuid}`);
    return result;
  } catch (error: any) {
    console.error(`❌ Failed to register ${definition.name}:`, error.message);
    throw error;
  }
}

async function registerAllChainhooks() {
  console.log('🚀 Registering QuestStack Chainhooks on MAINNET...\n');

  // 1. Quest Created Hook
  await registerChainhook({
    name: 'QuestStack - Quest Created',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: QUEST_CONTRACT,
          function_name: 'create-quest',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/quest-created`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
      start_at_block_height: undefined, // Start from current block
    },
  });

  // 2. Quest Completed Hook
  await registerChainhook({
    name: 'QuestStack - Quest Completed',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: QUEST_CONTRACT,
          function_name: 'complete-quest',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/quest-completed`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 3. Reward Claimed Hook
  await registerChainhook({
    name: 'QuestStack - Reward Claimed',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: QUEST_CONTRACT,
          function_name: 'claim-reward',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/reward-claimed`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 4. Token Mint Hook
  await registerChainhook({
    name: 'QuestStack - Token Mint',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: REWARD_TOKEN_CONTRACT,
          function_name: 'mint',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/token-mint`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 5. Token Transfer Hook
  await registerChainhook({
    name: 'QuestStack - Token Transfer',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: REWARD_TOKEN_CONTRACT,
          function_name: 'transfer',
        },
        {
          type: 'contract_call',
          contract_identifier: REWARD_TOKEN_CONTRACT,
          function_name: 'transfer-from',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/token-transfer`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 6. Stake Deposited Hook
  await registerChainhook({
    name: 'QuestStack - Stake Deposited',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: STAKING_CONTRACT,
          function_name: 'stake',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/stake-deposited`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 7. Stake Withdrawn Hook
  await registerChainhook({
    name: 'QuestStack - Stake Withdrawn',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: STAKING_CONTRACT,
          function_name: 'unstake',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/stake-withdrawn`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 8. Proposal Created Hook
  await registerChainhook({
    name: 'QuestStack - Proposal Created',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: GOVERNANCE_CONTRACT,
          function_name: 'propose',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/proposal-created`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  // 9. Vote Cast Hook
  await registerChainhook({
    name: 'QuestStack - Vote Cast',
    chain: 'stacks',
    network: 'mainnet',
    filters: {
      events: [
        {
          type: 'contract_call',
          contract_identifier: GOVERNANCE_CONTRACT,
          function_name: 'vote',
        },
      ],
    },
    action: {
      type: 'http_post',
      url: `${WEBHOOK_BASE_URL}/vote-cast`,
      authorization_header: `Bearer ${process.env.WEBHOOK_SECRET || ''}`,
    },
    options: {
      decode_clarity_values: true,
      enable_on_registration: true,
    },
  });

  console.log('\n✅ All 9 Chainhooks registered successfully!');
}

// Run if called directly
if (require.main === module) {
  registerAllChainhooks().catch(console.error);
}

export { registerAllChainhooks };

