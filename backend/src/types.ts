/**
 * Backend Types
 * TypeScript interfaces for QuestStack backend
 * 
 * @module backend/types
 */

export interface WebhookEvent {
  type: string;
  chainhook: {
    txid: string;
    block_height: number;
    timestamp: string;
  };
  payload: Record<string, unknown>;
}

export interface QuestCreatedEvent extends WebhookEvent {
  type: 'quest_created';
  payload: {
    quest_id: number;
    creator: string;
    title: string;
    reward_amount: number;
    deadline: number;
  };
}

export interface QuestCompletedEvent extends WebhookEvent {
  type: 'quest_completed';
  payload: {
    quest_id: number;
    completer: string;
  };
}

export interface RewardClaimedEvent extends WebhookEvent {
  type: 'reward_claimed';
  payload: {
    quest_id: number;
    claimer: string;
    amount: number;
  };
}

export interface StakeDepositedEvent extends WebhookEvent {
  type: 'stake_deposited';
  payload: {
    user: string;
    amount: number;
  };
}

export interface StakeWithdrawnEvent extends WebhookEvent {
  type: 'stake_withdrawn';
  payload: {
    user: string;
    amount: number;
  };
}

export interface ProposalCreatedEvent extends WebhookEvent {
  type: 'proposal_created';
  payload: {
    proposal_id: number;
    proposer: string;
    title: string;
  };
}

export interface VoteCastEvent extends WebhookEvent {
  type: 'vote_cast';
  payload: {
    proposal_id: number;
    voter: string;
    support: boolean;
  };
}

export type WebhookEventType = 
  | QuestCreatedEvent
  | QuestCompletedEvent
  | RewardClaimedEvent
  | StakeDepositedEvent
  | StakeWithdrawnEvent
  | ProposalCreatedEvent
  | VoteCastEvent;

export interface HealthResponse {
  status: 'ok' | 'error';
  service: string;
  timestamp: string;
  uptime: number;
  memory: {
    heap_used: number;
    heap_total: number;
    external: number;
  };
}

export interface MetricsResponse {
  total_quests: number;
  total_completions: number;
  total_staked: number;
  total_proposals: number;
  total_votes: number;
}
