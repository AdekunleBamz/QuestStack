/**
 * Staking Panel Component using @stacks/connect and @stacks/transactions
 */

import { useStacksConnect } from '@/hooks/useStacksConnect';
import { useTransactions } from '@/hooks/useTransactions';
import { useState } from 'react';

export function StakingPanel() {
  const { isAuthenticated, userData } = useStacksConnect();
  const { stake, unstake, loading } = useTransactions();
  const [stakeAmount, setStakeAmount] = useState('');
  const [unstakeAmount, setUnstakeAmount] = useState('');

  if (!isAuthenticated) {
    return <p>Please connect your wallet to stake tokens</p>;
  }

  const handleStake = () => {
    const amount = parseInt(stakeAmount);
    if (amount > 0) {
      stake(amount);
    }
  };

  const handleUnstake = () => {
    const amount = parseInt(unstakeAmount);
    if (amount > 0) {
      unstake(amount);
    }
  };

  return (
    <div className="staking-panel">
      <h2>Staking</h2>
      <div>
        <input
          type="number"
          value={stakeAmount}
          onChange={(e) => setStakeAmount(e.target.value)}
          placeholder="Amount to stake"
        />
        <button onClick={handleStake} disabled={loading}>
          {loading ? 'Processing...' : 'Stake'}
        </button>
      </div>
      <div>
        <input
          type="number"
          value={unstakeAmount}
          onChange={(e) => setUnstakeAmount(e.target.value)}
          placeholder="Amount to unstake"
        />
        <button onClick={handleUnstake} disabled={loading}>
          {loading ? 'Processing...' : 'Unstake'}
        </button>
      </div>
    </div>
  );
}

