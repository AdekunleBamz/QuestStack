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
  const [activeTab, setActiveTab] = useState<'stake' | 'unstake'>('stake');

  if (!isAuthenticated) {
    return (
      <div className="panel panel-locked">
        <div className="panel-lock-icon">🔒</div>
        <p className="panel-lock-message">Please connect your wallet to stake tokens</p>
      </div>
    );
  }

  const handleStake = () => {
    const amount = parseInt(stakeAmount);
    if (amount > 0) {
      stake(amount);
      setStakeAmount('');
    }
  };

  const handleUnstake = () => {
    const amount = parseInt(unstakeAmount);
    if (amount > 0) {
      unstake(amount);
      setUnstakeAmount('');
    }
  };

  return (
    <div className="panel staking-panel">
      <div className="panel-header">
        <h2 className="panel-title">💎 Staking</h2>
      </div>
      
      <div className="panel-tabs">
        <button
          className={`panel-tab ${activeTab === 'stake' ? 'panel-tab-active' : ''}`}
          onClick={() => setActiveTab('stake')}
        >
          Stake
        </button>
        <button
          className={`panel-tab ${activeTab === 'unstake' ? 'panel-tab-active' : ''}`}
          onClick={() => setActiveTab('unstake')}
        >
          Unstake
        </button>
      </div>

      <div className="panel-content">
        {activeTab === 'stake' ? (
          <div className="staking-form">
            <label className="input-label">Amount to Stake</label>
            <div className="input-group">
              <input
                type="number"
                value={stakeAmount}
                onChange={(e) => setStakeAmount(e.target.value)}
                placeholder="0"
                className="panel-input"
                min="0"
              />
              <span className="input-suffix">TOKENS</span>
            </div>
            <button
              onClick={handleStake}
              disabled={loading || !stakeAmount}
              className="panel-btn panel-btn-primary"
            >
              {loading ? 'Staking...' : 'Stake Tokens'}
            </button>
          </div>
        ) : (
          <div className="staking-form">
            <label className="input-label">Amount to Unstake</label>
            <div className="input-group">
              <input
                type="number"
                value={unstakeAmount}
                onChange={(e) => setUnstakeAmount(e.target.value)}
                placeholder="0"
                className="panel-input"
                min="0"
              />
              <span className="input-suffix">TOKENS</span>
            </div>
            <button
              onClick={handleUnstake}
              disabled={loading || !unstakeAmount}
              className="panel-btn panel-btn-secondary"
            >
              {loading ? 'Unstaking...' : 'Unstake Tokens'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

