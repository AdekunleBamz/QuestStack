/**
 * Constants
 * Global constants for QuestStack
 * 
 * @module constants
 */

// Contract addresses (update after deployment)
export const CONTRACTS = {
  QUEST_CONTRACT: process.env.NEXT_PUBLIC_QUEST_CONTRACT || '',
  REWARD_TOKEN_CONTRACT: process.env.NEXT_PUBLIC_REWARD_TOKEN_CONTRACT || '',
  STAKING_CONTRACT: process.env.NEXT_PUBLIC_STAKING_CONTRACT || '',
  GOVERNANCE_CONTRACT: process.env.NEXT_PUBLIC_GOVERNANCE_CONTRACT || '',
};

// Token decimals
export const DECIMALS = 6;

// Minimum stake amount (1 token)
export const MINIMUM_STAKE = 1000000;

// Staking reward rate (1% per block)
export const REWARD_RATE = 100;

// Voting period (in blocks)
export const VOTING_PERIOD = 1000;

// Minimum votes for proposal to pass
export const MINIMUM_VOTES = 10;

// Quest status values
export const QUEST_STATUS = {
  ACTIVE: 1,
  COMPLETED: 2,
  CANCELLED: 3,
} as const;

// Proposal status values
export const PROPOSAL_STATUS = {
  PENDING: 1,
  ACTIVE: 2,
  PASSED: 3,
  REJECTED: 4,
  EXECUTED: 5,
} as const;
