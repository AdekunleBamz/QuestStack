/**
 * Register all 9 Chainhooks for QuestStack on MAINNET
 * Uses @hirosystems/chainhooks-client
 * Enhanced with retry logic and improved error handling
 */

import { ChainhooksClient, CHAINHOOKS_BASE_URL, ChainhookDefinition } from '@hirosystems/chainhooks-client';
import * as dotenv from 'dotenv';

dotenv.config();

const MAX_RETRIES = 3;
const RETRY_DELAY = 5000; // 5 seconds

const client = new ChainhooksClient({
  baseUrl: CHAINHOOKS_BASE_URL.mainnet,
  apiKey: process.env.CHAINHOOKS_API_KEY!,
});

const QUEST_CONTRACT = process.env.QUEST_CONTRACT_ADDRESS || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.REWARD_TOKEN_CONTRACT_ADDRESS || 'SP...';
const STAKING_CONTRACT = process.env.STAKING_CONTRACT_ADDRESS || 'SP...';
const GOVERNANCE_CONTRACT = process.env.GOVERNANCE_CONTRACT_ADDRESS || 'SP...';

const WEBHOOK_BASE_URL = process.env.WEBHOOK_BASE_URL || 'https://your-backend.com/webhooks';

// Retry helper function
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> {
  try {
    return await fn();
  } catch (error: any) {
    if (retries > 0) {
      console.log(`Retrying in ${RETRY_DELAY}ms... (${retries} retries left)`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryWithBackoff(fn, retries - 1);
    }
    throw error;
  }
}

// Register a chainhook with retry logic
async function registerChainhook(definition: ChainhookDefinition): Promise<string> {
  return retryWithBackoff(async () => {
    try {
      const result = await client.registerChainhook(definition);
      console.log(`✅ Registered: ${definition.name}`);
      console.log(`   UUID: ${result.uuid}`);
      return result.uuid;
    } catch (error: any) {
      console.error(`❌ Failed to register ${definition.name}:`, error.message);
      throw error;
    }
  });
}

async function registerAllChainhooks() {
  console.log('🚀 Starting QuestStack Chainhooks registration...\n');

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
    name: '