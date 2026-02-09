/**
 * Transaction Builder Utilities using @stacks/transactions
 * Comprehensive transaction building for all QuestStack operations
 * Enhanced with TypeScript types and error handling
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

const QUEST_CONTRACT = process.env.NEXT_PUBLIC_QUEST_CONTRACT || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.NEXT_PUBLIC_REWARD_TOKEN_CONTRACT || 'SP...';
const STAKING_CONTRACT = process.env.NEXT_PUBLIC_STAKING_CONTRACT || 'SP...';
const GOVERNANCE_CONTRACT = process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT || 'SP...';

interface TransactionResult {
  txId: string;
  rawTx: Buffer;
}

interface BuildTransactionOptions {
  fee?: number;
  nonce?: number;
}

// Default transaction options
const DEFAULT_OPTIONS: BuildTransactionOptions = {
  fee: 2000,
  nonce: 0,
};

/**
 * Build transaction for creating a quest
 */
export async function buildCreateQuestTransaction(
  senderKey: string,
  title: string,
  description: string,
  rewardAmount: number,
  deadline: number,
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  const tx = await makeContractCall({
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
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Build transaction for completing a quest
 */
export async function buildCompleteQuestTransaction(
  senderKey: string,
  questId: number,
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'complete-quest',
    functionArgs: [uintCV(questId)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Build transaction for claiming reward
 */
export async function buildClaimRewardTransaction(
  senderKey: string,
  questId: number,
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = QUEST_CONTRACT.split('.');
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'claim-reward',
    functionArgs: [uintCV(questId)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Build transaction for staking tokens
 */
export async function buildStakeTransaction(
  senderKey: string,
  amount: number,
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'stake',
    functionArgs: [uintCV(amount)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Deny,
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Build transaction for unstaking tokens
 */
export async function buildUnstakeTransaction(
  senderKey: string,
  amount: number,
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = STAKING_CONTRACT.split('.');
  
  const tx = await makeContractCall({
    contractAddress,
    contractName,
    functionName: 'unstake',
    functionArgs: [uintCV(amount)],
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    postConditionMode: PostConditionMode.Allow,
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
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
  parameters: any[] = [],
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  const tx = await makeContractCall({
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
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Build transaction for voting on a proposal
 */
export async function buildVoteTransaction(
  senderKey: string,
  proposalId: number,
  support: boolean,
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const [contractAddress, contractName] = GOVERNANCE_CONTRACT.split('.');
  
  const tx = await makeContractCall({
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
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Build STX transfer transaction
 */
export async function buildSTXTransferTransaction(
  senderKey: string,
  recipient: string,
  amount: bigint,
  memo: string = 'QuestStack transfer',
  options: BuildTransactionOptions = DEFAULT_OPTIONS
): Promise<TransactionResult> {
  const tx = await makeSTXTokenTransfer({
    recipient,
    amount,
    senderKey,
    network,
    anchorMode: AnchorMode.Any,
    memo,
    fee: options.fee,
    nonce: options.nonce,
  });

  return {
    txId: tx.txid(),
    rawTx: tx,
  };
}

/**
 * Estimate transaction fee
 */
export function estimateFee(gasUnits: number, gasPrice: number = 1): number {
  return gasUnits * gasPrice;
}
