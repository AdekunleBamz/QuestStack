/**
 * Staking Service
 * Business logic for staking operations
 * 
 * @module services/stakingService
 */

export interface StakeInfo {
  user: string;
  amount: number;
  timestamp: number;
}

export interface StakeResult {
  success: boolean;
  error?: string;
}

export class StakingService {
  private stakes: Map<string, StakeInfo> = new Map();

  async stake(user: string, amount: number): Promise<StakeResult> {
    try {
      const current = this.stakes.get(user) || { user, amount: 0, timestamp: 0 };
      this.stakes.set(user, {
        user,
        amount: current.amount + amount,
        timestamp: Date.now(),
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to stake' };
    }
  }

  async unstake(user: string, amount: number): Promise<StakeResult> {
    try {
      const current = this.stakes.get(user);
      if (!current || current.amount < amount) {
        return { success: false, error: 'Insufficient stake' };
      }
      this.stakes.set(user, {
        user,
        amount: current.amount - amount,
        timestamp: current.timestamp,
      });
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to unstake' };
    }
  }

  async getStake(user: string): Promise<number> {
    return this.stakes.get(user)?.amount || 0;
  }

  async getTotalStaked(): Promise<number> {
    return Array.from(this.stakes.values()).reduce((sum, s) => sum + s.amount, 0);
  }
}

export const stakingService = new StakingService();
