/**
 * Quest Card Component using @stacks/transactions
 */

import { useTransactions } from '@/hooks/useTransactions';

interface QuestCardProps {
  questId: number;
  title: string;
  description: string;
  rewardAmount: number;
  status: string;
}

export function QuestCard({ questId, title, description, rewardAmount, status }: QuestCardProps) {
  const { completeQuest, claimReward, loading } = useTransactions();

  const handleComplete = () => {
    completeQuest(questId);
  };

  const handleClaim = () => {
    claimReward(questId);
  };

  const getStatusBadgeClass = () => {
    switch (status) {
      case 'active':
        return 'status-badge status-active';
      case 'completed':
        return 'status-badge status-completed';
      case 'claimed':
        return 'status-badge status-claimed';
      default:
        return 'status-badge';
    }
  };

  return (
    <div className="quest-card">
      <div className="quest-header">
        <h3>{title}</h3>
        <span className={getStatusBadgeClass()}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>
      <p className="quest-description">{description}</p>
      <div className="quest-reward">
        <span className="reward-icon">💰</span>
        <span className="reward-amount">{rewardAmount} tokens</span>
      </div>
      {status === 'active' && (
        <button onClick={handleComplete} disabled={loading} className="quest-btn">
          {loading ? 'Processing...' : 'Complete Quest'}
        </button>
      )}
      {status === 'completed' && (
        <button onClick={handleClaim} disabled={loading} className="quest-btn quest-btn-success">
          {loading ? 'Processing...' : 'Claim Reward'}
        </button>
      )}
    </div>
  );
}

