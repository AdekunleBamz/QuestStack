/**
 * QuestCard Component
 * Displays a single quest with completion and claim actions
 * 
 * @component
 * @description Shows quest details and action buttons
 */

'use client';

import { useState } from 'react';

interface QuestCardProps {
  questId: number;
  title: string;
  description: string;
  rewardAmount: number;
  deadline: number;
  status: 'active' | 'completed' | 'cancelled';
  isCreator?: boolean;
  isCompleter?: boolean;
  onComplete?: (questId: number) => void;
  onClaim?: (questId: number) => void;
  onCancel?: (questId: number) => void;
}

export function QuestCard({
  questId,
  title,
  description,
  rewardAmount,
  deadline,
  status,
  isCreator = false,
  isCompleter = false,
  onComplete,
  onClaim,
  onCancel,
}: QuestCardProps) {
  const [loading, setLoading] = useState(false);

  const formatDeadline = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  const isExpired = Date.now() / 1000 > deadline;

  const handleComplete = async () => {
    setLoading(true);
    try {
      await onComplete?.(questId);
    } finally {
      setLoading(false);
    }
  };

  const handleClaim = async () => {
    setLoading(true);
    try {
      await onClaim?.(questId);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await onCancel?.(questId);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`quest-card ${status}`}>
      <h3>{title}</h3>
      <p className="quest-description">{description}</p>
      
      <div className="quest-meta">
        <span className="reward">🎁 Reward: {rewardAmount} QST</span>
        <span className="deadline">⏰ Deadline: {formatDeadline(deadline)}</span>
      </div>

      <div className="quest-status">
        Status: <span className={`status-badge ${status}`}>{status}</span>
      </div>

      <div className="quest-actions">
        {status === 'active' && !isExpired && !isCompleter && (
          <button onClick={handleComplete} disabled={loading}>
            {loading ? 'Processing...' : 'Complete Quest'}
          </button>
        )}

        {isCompleter && status === 'completed' && (
          <button onClick={handleClaim} disabled={loading}>
            {loading ? 'Processing...' : 'Claim Reward'}
          </button>
        )}

        {isCreator && status === 'active' && (
          <button onClick={handleCancel} disabled={loading} className="cancel-btn">
            {loading ? 'Processing...' : 'Cancel Quest'}
          </button>
        )}
      </div>
    </div>
  );
}
