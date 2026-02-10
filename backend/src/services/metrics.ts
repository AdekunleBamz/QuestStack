/**
 * Metrics Service
 * Tracks webhook and system metrics
 * 
 * @module services/metrics
 */

import { Request, Response } from 'express';

interface Metrics {
  totalQuests: number;
  totalCompletions: number;
  totalStaked: number;
  totalProposals: number;
  totalVotes: number;
  webhooksProcessed: Map<string, number>;
  uptime: number;
  startTime: number;
}

const metrics: Metrics = {
  totalQuests: 0,
  totalCompletions: 0,
  totalStaked: 0,
  totalProposals: 0,
  totalVotes: 0,
  webhooksProcessed: new Map(),
  uptime: 0,
  startTime: Date.now(),
};

export function initMetrics() {
  metrics.startTime = Date.now();
  metrics.uptime = 0;
  
  setInterval(() => {
    metrics.uptime = Date.now() - metrics.startTime;
  }, 1000);
}

export function trackWebhook(type: string) {
  const count = metrics.webhooksProcessed.get(type) || 0;
  metrics.webhooksProcessed.set(type, count + 1);
}

export function trackQuestCreated() {
  metrics.totalQuests++;
}

export function trackQuestCompleted() {
  metrics.totalCompletions++;
}

export function trackStakeDeposited(amount: number) {
  metrics.totalStaked += amount;
}

export function trackProposalCreated() {
  metrics.totalProposals++;
}

export function trackVoteCast() {
  metrics.totalVotes++;
}

export function getMetrics() {
  return {
    totalQuests: metrics.totalQuests,
    totalCompletions: metrics.totalCompletions,
    totalStaked: metrics.totalStaked,
    totalProposals: metrics.totalProposals,
    totalVotes: metrics.totalVotes,
    webhooksProcessed: Object.fromEntries(metrics.webhooksProcessed),
    uptime: metrics.uptime,
  };
}

export function metricsEndpoint(req: Request, res: Response) {
  res.json(getMetrics());
}
