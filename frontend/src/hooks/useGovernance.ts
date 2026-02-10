/**
 * useGovernance Hook
 * React hook for managing governance proposals and voting
 * 
 * @module hooks/useGovernance
 */

import { useState, useCallback } from 'react';
import { getProposal, getProposalCounter, hasUserVoted } from '@/services/contractService';
import { buildCreateProposalTransaction, buildVoteTransaction } from '@/utils/transactionBuilder';

export interface Proposal {
  id: number;
  proposer: string;
  title: string;
  description: string;
  targetContract: string;
  functionName: string;
  status: 'pending' | 'active' | 'passed' | 'rejected' | 'executed';
  createdAt: number;
  endTime: number;
  votesFor: number;
  votesAgainst: number;
}

export function useGovernance() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProposals = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const counter = await getProposalCounter();
      const loadedProposals: Proposal[] = [];
      
      for (let i = 1; i <= counter; i++) {
        const proposalData = await getProposal(i);
        if (proposalData) {
          loadedProposals.push(proposalData as Proposal);
        }
      }
      
      setProposals(loadedProposals);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load proposals');
    } finally {
      setLoading(false);
    }
  }, []);

  const createProposal = useCallback(async (
    userKey: string,
    title: string,
    description: string,
    targetContract: string,
    functionName: string,
    parameters: unknown[] = []
  ) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildCreateProposalTransaction(
        userKey, title, description, targetContract, functionName, parameters
      );
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create proposal');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const vote = useCallback(async (userKey: string, proposalId: number, support: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const tx = await buildVoteTransaction(userKey, proposalId, support);
      return tx;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vote');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkIfVoted = useCallback(async (proposalId: number, userAddress: string) => {
    try {
      return await hasUserVoted(proposalId, userAddress);
    } catch {
      return false;
    }
  }, []);

  return {
    proposals,
    loading,
    error,
    loadProposals,
    createProposal,
    vote,
    checkIfVoted,
  };
}
