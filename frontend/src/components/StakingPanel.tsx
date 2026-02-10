/**
 * StakingPanel Component
 * UI for staking tokens and viewing stake info
 * 
 * @component
 */

'use client';

import { useState } from 'react';

interface StakingPanelProps {
  stakedAmount: number;
  hasPremium: boolean;
  pendingRewards: number;
  onStake?: (amount: number) => void;
  onUnstake?: (amount: number) => void;
  onClaimRewards?: () => void;
}

export function StakingPanel({
  stakedAmount,
  hasPremium,
  pendingRewards,
  onStake,
  onUnstake,
  onClaimRewards,
}: StakingPanelProps) {
  const [amount, setAmount] = useState('');

  const formatAmount = (val: number) => (val / 1000000).toFixed(2);

  const handleStake = () => {
    const val = parseFloat(amount);
    if (val > 0) {
      onStake?.(val * 1000000);
      setAmount('');
    }
  };

  const handleUnstake = () => {
    const val = parseFloat(amount);
    if (val > 0 && val * 1000000 <= stakedAmount) {
      onUnstake?.(val * 1000000);
      setAmount('');
    }
  };

  return (
    <div className="staking-panel">
      <h2>Staking</h2>
      
      <div className="staking-stats">
        <div className="stat">
          <span className="label">Staked:</span>
          <span className="value">{formatAmount(stakedAmount)} QST</span>
        </div>
        <div className="stat">
          <span className="label">Premium:</span>
          <span className={hasPremium ? 'premium' : 'regular'}>
            {hasPremium ? 'Premium' : 'Basic'}
          </span>
        </div>
      </div>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <button onClick={handleStake}>Stake</button>
      <button onClick={handleUnstake}>Unstake</button>
    </div>
  );
}
