/**
 * useQuests Hook
 * React hook for managing quest state and operations
 * 
 * @module hooks/useQuests
 */

import { useState, useCallback } from 'react';
import { getQuest, getQuestCounter, getUserCompletions } from '@/services/contractService';
import { buildCreateQuestTransaction, buildCompleteQuestTransaction, buildClaimRewardTransaction } from '@/utils/transactionBuilder';

export interface Quest {
  id: number;
  creator: string;
  title: string;
  description: string;
  rewardAmount: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: number;
  deadline: number;
  completer?: string;
  completedAt?: number;
}

export function useQuests() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadQuests = useCallback(async (userAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const counter = await getQuestCounter();
      const loadedQuests: Quest[] = [];
      
      for (let i = 1; i <= counter; i++) {
        const questData = await getQuest(i);
        if (questData) {
          loadedQuests.push(questData as Quest);
        }
      }
      
      setQuests(loadedQuests);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load quests');
    } finally {
      setLoading(false);
    }
  }, []);

  const createQuest = useCallback(async (
    userKey: string,
    title: string,
    description: string,
    rewardAmount: number,
    deadline: number
  ) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildCreateQuestTransaction(userKey, title, description, rewardAmount, deadline);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create quest');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const completeQuest = useCallback(async (userKey: string, questId: number) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildCompleteQuestTransaction(userKey, questId);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to complete quest');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const claimReward = useCallback(async (userKey: string, questId: number) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildClaimRewardTransaction(userKey, questId);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to claim reward');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    quests,
    loading,
    error,
    loadQuests,
    createQuest,
    completeQuest,
    claimReward,
  };
}
