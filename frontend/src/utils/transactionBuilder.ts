/**
 * Transaction Builder Utilities using @stacks/transactions
 * Comprehensive transaction building for all QuestStack operations
 * 
 * @module utils/transactionBuilder
 * @description Provides transaction builders for all QuestStack smart contract functions
 * 
 * @example
 * import { buildCreateQuestTransaction, buildCompleteQuestTransaction } from '@/utils/transactionBuilder';
 * 
 * const tx = await buildCreateQuestTransaction(
 *   userKey,
 *   'Complete 10 quests',
 *   'Complete 10 quests to earn 100 tokens',
 *   100000000,
 *   Math.floor(Date.now() / 1000) + 86400
 * );
 */

import {
  makeContractCall,
  makeSTXTokenTransfer,
  AnchorMode,
  PostConditionMode,
  uintCV,
  stringAsciiCV,
  standardPrincipalCV,
  listCV,
  StacksMainnet,
  createAssetInfo,
  FungibleConditionCode,
  makeStandardFungiblePostCondition,
} from '@stacks/transactions';

const network = new StacksMainnet();

// Contract addresses
const QUEST_CONTRACT = process.env.NEXT_PUBLIC_QUEST_CONTRACT || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.NEXT_PUBLIC_REWARD_TOKEN_CONTRACT || 'SP...';
const STAKING_CONTRACT = process.env.NEXT_PUBLIC_STAKING_CONTRACT || 'SP...';
const GOVERNANCE_CONTRACT = process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT || 'SP...';

/**
 * Build transaction for creating a quest
 */
export async function buildCreateQuestTransaction(
  senderKey: string,
  title: string,
  description: string,
  rewardAmount: number,
  deadline: number
) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'create-quest',
    functionArgs: [
      stringAsciiCV(title),
      stringAsciiCV(description),
      uintCV(rewardAmount),
      uintCV(deadline),
    ],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000,
  });
}

/**
 * Build transaction for completing a quest
 */
export async function buildCompleteQuestTransaction(
  senderKey: string,
  questId: number
) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'complete-quest',
    functionArgs: [uintCV(questId)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000,
  });
}

/**
 * Build transaction for claiming reward
 */
export async function buildClaimRewardTransaction(
  senderKey: string,
  questId: number
) {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'claim-reward',
    functionArgs: [uintCV(questId)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000,
  });
}

/**
 * Build transaction for staking tokens
 */
export async function buildStakeTransaction(
  senderKey: string,
  amount: number
) {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'stake',
    functionArgs: [uintCV(amount)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    fee: 2000,
  });
}

/**
 * Build transaction for unstaking tokens
 */
export async function buildUnstakeTransaction(
  senderKey: string,
  amount: number
) {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'unstake',
    functionArgs: [uintCV(amount)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000,
  });
}

/**
 * Build transaction for creating a governance proposal
 */
export async function buildCreateProposalTransaction(
  senderKey: string,
  title: string,
  description: string,
  targetContract: string,
  functionName: string,
  parameters: any[] = []
) {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'propose',
    functionArgs: [
      stringAsciiCV(title),
      stringAsciiCV(description),
      standardPrincipalCV(targetContract),
      stringAsciiCV(functionName),
      listCV(parameters),
    ],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000,
  });
}

/**
 * Build transaction for voting on a proposal
 */
export async function buildVoteTransaction(
  senderKey: string,
  proposalId: number,
  support: boolean
) {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  return makeContractCall({
    contractAddress,
    contractName,
    functionName: 'vote',
    functionArgs: [
      uintCV(proposalId),
      support ? uintCV(1) : uintCV(0),
    ],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: 2000,
  });
}

/**
 * Build STX transfer transaction
 */
export async function buildSTXTransferTransaction(
  senderKey: string,
  recipient: string,
  amount: bigint
) {
  return makeSTXTokenTransfer({
    recipient,
    amount,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    memo: 'QuestStack transfer',
    fee: 2000,
  });
}

