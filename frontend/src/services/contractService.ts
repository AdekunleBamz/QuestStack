/**
 * Contract Service using @stacks/transactions
 * Service layer for interacting with QuestStack contracts
 * Enhanced with error handling and caching
 */

import {
  callReadOnlyFunction,
  cvToJSON,
  uintCV,
  standardPrincipalCV,
  StacksMainnet,
} from '@stacks/transactions';

// Cache for read-only calls to reduce network requests
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_TTL = 30000; // 30 seconds

const network = new StacksMainnet();

const QUEST_CONTRACT = process.env.NEXT_PUBLIC_QUEST_CONTRACT || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.NEXT_PUBLIC_REWARD_TOKEN_CONTRACT || 'SP...';
const STAKING_CONTRACT = process.env.NEXT_PUBLIC_STAKING_CONTRACT || 'SP...';
const GOVERNANCE_CONTRACT = process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT || 'SP...';

// Helper to get cached data or fetch new data
async function getCachedOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>
): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_TTL) {
    return cached.data;
  }
  
  const data = await fetcher();
  cache.set(key, { data, timestamp: Date.now() });
  return data;
}

// Clear cache
export function clearCache() {
  cache.clear();
}

/**
 * Read-only function calls to Quest Contract
 */
export async function getQuest(questId: number) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  return getCachedOrFetch(`quest-${questId}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-quest',
      functionArgs: [uintCV(questId)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getQuestCounter() {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  return getCachedOrFetch('quest-counter', async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-quest-counter',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getUserCompletions(userAddress: string) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  return getCachedOrFetch(`completions-${userAddress}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-user-completions',
      functionArgs: [standardPrincipalCV(userAddress)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

/**
 * Read-only function calls to Reward Token Contract
 */
export async function getTokenBalance(ownerAddress: string) {
  const [contractAddress, contractName] = REWARD_TOKEN_CONTRACT.split('.');
  
  return getCachedOrFetch(`balance-${ownerAddress}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-balance',
      functionArgs: [standardPrincipalCV(ownerAddress)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getTotalSupply() {
  const [contractAddress, contractName] = REWARD_TOKEN_CONTRACT.split('.');
  
  return getCachedOrFetch('total-supply', async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-total-supply',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getContractOwner() {
  const [contractAddress, contractName] = REWARD_TOKEN_CONTRACT.split('.');
  
  return getCachedOrFetch('token-owner', async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-contract-owner',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

/**
 * Read-only function calls to Staking Contract
 */
export async function getStake(userAddress: string) {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  return getCachedOrFetch(`stake-${userAddress}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-stake',
      functionArgs: [standardPrincipalCV(userAddress)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function hasPremiumAccess(userAddress: string) {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  return getCachedOrFetch(`premium-${userAddress}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'has-premium-access',
      functionArgs: [standardPrincipalCV(userAddress)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getMinimumStake() {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  return getCachedOrFetch('min-stake', async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-minimum-stake',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

/**
 * Read-only function calls to Governance Contract
 */
export async function getProposal(proposalId: number) {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  return getCachedOrFetch(`proposal-${proposalId}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-proposal',
      functionArgs: [uintCV(proposalId)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getProposalCounter() {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  return getCachedOrFetch('proposal-counter', async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-proposal-counter',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function hasUserVoted(proposalId: number, userAddress: string) {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  return getCachedOrFetch(`voted-${proposalId}-${userAddress}`, async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'has-user-voted',
      functionArgs: [uintCV(proposalId), standardPrincipalCV(userAddress)],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}

export async function getVotingPeriod() {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  return getCachedOrFetch('voting-period', async () => {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-voting-period',
      functionArgs: [],
      network,
      senderAddress: contractAddress,
    });
    return cvToJSON(result);
  });
}
