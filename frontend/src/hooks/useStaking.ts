/**
 * useStaking Hook
 * React hook for managing staking state and operations
 * 
 * @module hooks/useStaking
 */

import { useState, useCallback } from 'react';
import { getStake, hasPremiumAccess, getStakingRewards } from '@/services/contractService';
import { buildStakeTransaction, buildUnstakeTransaction } from '@/utils/transactionBuilder';

export interface StakeInfo {
  stakedAmount: number;
  hasPremium: boolean;
  pendingRewards: number;
}

export function useStaking() {
  const [stakeInfo, setStakeInfo] = useState<StakeInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadStakeInfo = useCallback(async (userAddress: string) => {
    setLoading(true);
    setError(null);
    try {
      const [stake, premium, rewards] = await Promise.all([
        getStake(userAddress),
        hasPremiumAccess(userAddress),
        getStakingRewards(userAddress),
      ]);
      
      setStakeInfo({
        stakedAmount: stake,
        hasPremium: premium,
        pendingRewards: rewards,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load stake info');
    } finally {
      setLoading(false);
    }
  }, []);

  const stake = useCallback(async (userKey: string, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildStakeTransaction(userKey, amount);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to stake');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const unstake = useCallback(async (userKey: string, amount: number) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildUnstakeTransaction(userKey, amount);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to unstake');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    stakeInfo,
    loading,
    error,
    loadStakeInfo,
    stake,
    unstake,
  };
}
