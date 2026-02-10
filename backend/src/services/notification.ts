/**
 * Notification Service
 * Sends notifications for quest events
 * 
 * @module services/notification
 */

export interface NotificationPayload {
  title: string;
  body: string;
  userId?: string;
}

export class NotificationService {
  async sendEmail(to: string, subject: string, body: string): Promise<boolean> {
    console.log(`Email sent to ${to}: ${subject}`);
    return true;
  }

  async sendPush(payload: NotificationPayload): Promise<boolean> {
    console.log(`Push notification: ${payload.title}`);
    return true;
  }

  async notifyQuestCreated(userId: string, questTitle: string): Promise<void> {
    await this.sendPush({
      title: 'New Quest Created',
      body: `Your quest "${questTitle}" is now active`,
      userId,
    });
  }

  async notifyQuestCompleted(userId: string, questTitle: string): Promise<void> {
    await this.sendPush({
      title: 'Quest Completed!',
      body: `You completed "${questTitle}"`,
      userId,
    });
  }

  async notifyRewardClaimed(userId: string, amount: number): Promise<void> {
    await this.sendPush({
      title: 'Reward Claimed',
      body: `You claimed ${amount} QST`,
      userId,
    });
  }
}

export const notificationService = new NotificationService();
