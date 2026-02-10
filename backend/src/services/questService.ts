/**
 * Quest Service
 * Business logic for quest operations
 * 
 * @module services/questService
 */

export interface CreateQuestParams {
  creator: string;
  title: string;
  description: string;
  rewardAmount: number;
  deadline: number;
}

export interface QuestResult {
  success: boolean;
  questId?: number;
  error?: string;
}

export class QuestService {
  private quests: Map<number, CreateQuestParams> = new Map();
  private counter = 0;

  async createQuest(params: CreateQuestParams): Promise<QuestResult> {
    try {
      this.counter++;
      this.quests.set(this.counter, params);
      return { success: true, questId: this.counter };
    } catch (error) {
      return { success: false, error: 'Failed to create quest' };
    }
  }

  async getQuest(questId: number): Promise<CreateQuestParams | null> {
    return this.quests.get(questId) || null;
  }

  async getAllQuests(): Promise<CreateQuestParams[]> {
    return Array.from(this.quests.values());
  }

  async getQuestCount(): Promise<number> {
    return this.counter;
  }
}

export const questService = new QuestService();
