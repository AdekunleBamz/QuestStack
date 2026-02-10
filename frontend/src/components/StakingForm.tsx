/**
 * StakingForm Component
 * Form for staking operations
 * 
 * @component
 */

'use client';

import { useState } from 'react';

interface StakingFormProps {
  onStake?: (amount: number) => void;
  onUnstake?: (amount: number) => void;
  maxAmount?: number;
}

export function StakingForm({ onStake, onUnstake, maxAmount }: StakingFormProps) {
  const [amount, setAmount] = useState('');
  const [mode, setMode] = useState<'stake' | 'unstake'>('stake');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(amount);
    if (val > 0) {
      if (mode === 'stake') {
        onStake?.(val * 1000000);
      } else {
        onUnstake?.(val * 1000000);
      }
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="staking-form">
      <div className="mode-toggle">
        <button type="button" onClick={() => setMode('stake')} className={mode === 'stake' ? 'active' : ''}>
          Stake
        </button>
        <button type="button" onClick={() => setMode('unstake')} className={mode === 'unstake' ? 'active' : ''}>
          Unstake
        </button>
      </div>
      
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        max={mode === 'unstake' ? maxAmount : undefined}
      />
      
      <button type="submit">{mode === 'stake' ? 'Stake' : 'Unstake'}</button>
    </form>
  );
}
