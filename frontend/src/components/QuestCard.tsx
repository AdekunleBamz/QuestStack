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

  return (
    <div className="quest-card">
      <h3>{title}</h3>
      <p>{description}</p>
      <p>Reward: {rewardAmount} tokens</p>
      <p>Status: {status}</p>
      {status === 'active' && (
        <button onClick={handleComplete} disabled={loading}>
          {loading ? 'Processing...' : 'Complete Quest'}
        </button>
      )}
      {status === 'completed' && (
        <button onClick={handleClaim} disabled={loading}>
          {loading ? 'Processing...' : 'Claim Reward'}
        </button>
      )}
    </div>
  );
}

