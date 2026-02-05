/**
 * Custom hook for @stacks/transactions
 * Builds and broadcasts transactions for QuestStack contracts
 */

import { useConnect } from '@stacks/connect';
import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  PostConditionMode,
  createAssetInfo,
  FungibleConditionCode,
  makeStandardSTXPostCondition,
  uintCV,
  stringAsciiCV,
  listCV,
  someCV,
  noneCV,
  standardPrincipalCV,
  StacksMainnet,
} from '@stacks/transactions';
import { useState, useCallback } from 'react';

const network = new StacksMainnet();

// Contract addresses - UPDATE AFTER DEPLOYMENT
const QUEST_CONTRACT = process.env.NEXT_PUBLIC_QUEST_CONTRACT || 'SP...';
const REWARD_TOKEN_CONTRACT = process.env.NEXT_PUBLIC_REWARD_TOKEN_CONTRACT || 'SP...';
const STAKING_CONTRACT = process.env.NEXT_PUBLIC_STAKING_CONTRACT || 'SP...';
const GOVERNANCE_CONTRACT = process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT || 'SP...';

export function useTransactions() {
  const { doContractCall } = useConnect();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Create Quest
  const createQuest = useCallback(async (
    title: string,
    description: string,
    rewardAmount: number,
    deadline: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: QUEST_CONTRACT.split('.')[0],
        contractName: QUEST_CONTRACT.split('.')[1],
        functionName: 'create-quest',
        functionArgs: [
          stringAsciiCV(title),
          stringAsciiCV(description),
          uintCV(rewardAmount),
          uintCV(deadline),
        ],
        onFinish: (data) => {
          console.log('Quest created:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  // Complete Quest
  const completeQuest = useCallback(async (questId: number) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: QUEST_CONTRACT.split('.')[0],
        contractName: QUEST_CONTRACT.split('.')[1],
        functionName: 'complete-quest',
        functionArgs: [uintCV(questId)],
        onFinish: (data) => {
          console.log('Quest completed:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  // Claim Reward
  const claimReward = useCallback(async (questId: number) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: QUEST_CONTRACT.split('.')[0],
        contractName: QUEST_CONTRACT.split('.')[1],
        functionName: 'claim-reward',
        functionArgs: [uintCV(questId)],
        onFinish: (data) => {
          console.log('Reward claimed:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  // Stake Tokens
  const stake = useCallback(async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: STAKING_CONTRACT.split('.')[0],
        contractName: STAKING_CONTRACT.split('.')[1],
        functionName: 'stake',
        functionArgs: [uintCV(amount)],
        onFinish: (data) => {
          console.log('Tokens staked:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  // Unstake Tokens
  const unstake = useCallback(async (amount: number) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: STAKING_CONTRACT.split('.')[0],
        contractName: STAKING_CONTRACT.split('.')[1],
        functionName: 'unstake',
        functionArgs: [uintCV(amount)],
        onFinish: (data) => {
          console.log('Tokens unstaked:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  // Create Proposal
  const createProposal = useCallback(async (
    title: string,
    description: string,
    targetContract: string,
    functionName: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: GOVERNANCE_CONTRACT.split('.')[0],
        contractName: GOVERNANCE_CONTRACT.split('.')[1],
        functionName: 'propose',
        functionArgs: [
          stringAsciiCV(title),
          stringAsciiCV(description),
          standardPrincipalCV(targetContract),
          stringAsciiCV(functionName),
          listCV([]), // parameters
        ],
        onFinish: (data) => {
          console.log('Proposal created:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  // Vote
  const vote = useCallback(async (proposalId: number, support: boolean) => {
    setLoading(true);
    setError(null);
    try {
      await doContractCall({
        network,
        contractAddress: GOVERNANCE_CONTRACT.split('.')[0],
        contractName: GOVERNANCE_CONTRACT.split('.')[1],
        functionName: 'vote',
        functionArgs: [
          uintCV(proposalId),
          support ? uintCV(1) : uintCV(0),
        ],
        onFinish: (data) => {
          console.log('Vote cast:', data);
          setLoading(false);
        },
        onCancel: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, [doContractCall]);

  return {
    createQuest,
    completeQuest,
    claimReward,
    stake,
    unstake,
    createProposal,
    vote,
    loading,
    error,
  };
}

