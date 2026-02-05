/**
 * Contract Service using @stacks/transactions
 * Service layer for interacting with QuestStack contracts
 */

import {
  callReadOnlyFunction,
  cvToJSON,
  uintCV,
  standardPrincipalCV,
  StacksMainnet,
} from '@stacks/transactions';

const network = new StacksMainnet();

const QUEST_CONTRACT = process.env.NEXT_PUBLIC_QUEST_CONTRACT || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.NEXT_PUBLIC_REWARD_TOKEN_CONTRACT || 'SP...';
const STAKING_CONTRACT = process.env.NEXT_PUBLIC_STAKING_CONTRACT || 'SP...';
const GOVERNANCE_CONTRACT = process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT || 'SP...';

/**
 * Read-only function calls to Quest Contract
 */
export async function getQuest(questId: number) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-quest',
    functionArgs: [uintCV(questId)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

export async function getQuestCounter() {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-quest-counter',
    functionArgs: [],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

export async function getUserCompletions(userAddress: string) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-user-completions',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

/**
 * Read-only function calls to Reward Token Contract
 */
export async function getTokenBalance(ownerAddress: string) {
  const [contractAddress, contractName] = REWARD_TOKEN_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-balance',
    functionArgs: [standardPrincipalCV(ownerAddress)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

export async function getTotalSupply() {
  const [contractAddress, contractName] = REWARD_TOKEN_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-total-supply',
    functionArgs: [],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

/**
 * Read-only function calls to Staking Contract
 */
export async function getStake(userAddress: string) {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-stake',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

export async function hasPremiumAccess(userAddress: string) {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'has-premium-access',
    functionArgs: [standardPrincipalCV(userAddress)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

/**
 * Read-only function calls to Governance Contract
 */
export async function getProposal(proposalId: number) {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'get-proposal',
    functionArgs: [uintCV(proposalId)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

export async function hasUserVoted(proposalId: number, userAddress: string) {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  const result = await callReadOnlyFunction({
    contractAddress,
    contractName,
    functionName: 'has-user-voted',
    functionArgs: [uintCV(proposalId), standardPrincipalCV(userAddress)],
    network,
    senderAddress: contractAddress,
  });
  
  return cvToJSON(result);
}

