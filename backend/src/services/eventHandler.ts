/**
 * Event Handler Service
 * Processes webhook events from chainhooks
 * 
 * @module services/eventHandler
 */

import { WebhookEvent } from './types';

export interface EventHandler {
  canHandle(event: WebhookEvent): boolean;
  handle(event: WebhookEvent): Promise<void>;
}

export class QuestCreatedHandler implements EventHandler {
  canHandle(event: WebhookEvent): boolean {
    return event.type === 'quest_created';
  }

  async handle(event: WebhookEvent): Promise<void> {
    console.log('Processing quest created:', event.payload);
    // Add database logic, notifications, etc.
  }
}

export class QuestCompletedHandler implements EventHandler {
  canHandle(event: WebhookEvent): boolean {
    return event.type === 'quest_completed';
  }

  async handle(event: WebhookEvent): Promise<void> {
    console.log('Processing quest completed:', event.payload);
  }
}

export class RewardClaimedHandler implements EventHandler {
  canHandle(event: WebhookEvent): boolean {
    return event.type === 'reward_claimed';
  }

  async handle(event: WebhookEvent): Promise<void> {
    console.log('Processing reward claimed:', event.payload);
  }
}

export class StakeHandler implements EventHandler {
  canHandle(event: WebhookEvent): boolean {
    return event.type === 'stake_deposited' || event.type === 'stake_withdrawn';
  }

  async handle(event: WebhookEvent): Promise<void> {
    console.log('Processing stake event:', event.payload);
  }
}

export class GovernanceHandler implements EventHandler {
  canHandle(event: WebhookEvent): boolean {
    return event.type === 'proposal_created' || event.type === 'vote_cast';
  }

  async handle(event: WebhookEvent): Promise<void> {
    console.log('Processing governance event:', event.payload);
  }
}

export class EventRouter {
  private handlers: EventHandler[] = [
    new QuestCreatedHandler(),
    new QuestCompletedHandler(),
    new RewardClaimedHandler(),
    new StakeHandler(),
    new GovernanceHandler(),
  ];

  async route(event: WebhookEvent): Promise<boolean> {
    for (const handler of this.handlers) {
      if (handler.canHandle(event)) {
        await handler.handle(event);
        return true;
      }
    }
    console.warn('No handler found for event type:', event.type);
    return false;
  }
}
