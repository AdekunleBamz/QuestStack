/**
 * Governance Panel Component using @stacks/connect and @stacks/transactions
 */

import { useStacksConnect } from '@/hooks/useStacksConnect';
import { useTransactions } from '@/hooks/useTransactions';
import { useState } from 'react';

export function GovernancePanel() {
  const { isAuthenticated } = useStacksConnect();
  const { createProposal, vote, loading } = useTransactions();
  const [proposalTitle, setProposalTitle] = useState('');
  const [proposalDescription, setProposalDescription] = useState('');

  if (!isAuthenticated) {
    return (
      <div className="panel panel-locked">
        <div className="panel-lock-icon">🗳️</div>
        <p className="panel-lock-message">Please connect your wallet to participate in governance</p>
      </div>
    );
  }

  const handleCreateProposal = () => {
    if (proposalTitle && proposalDescription) {
      createProposal(
        proposalTitle,
        proposalDescription,
        process.env.NEXT_PUBLIC_QUEST_CONTRACT || '',
        'update-quest-parameters'
      );
      setProposalTitle('');
      setProposalDescription('');
    }
  };

  const handleVote = (proposalId: number, support: boolean) => {
    vote(proposalId, support);
  };

  return (
    <div className="panel governance-panel">
      <div className="panel-header">
        <h2 className="panel-title">🗳️ Governance</h2>
        <span className="panel-badge">DAO</span>
      </div>
      
      <div className="panel-content">
        <div className="governance-form">
          <div className="form-group">
            <label className="input-label">Proposal Title</label>
            <input
              type="text"
              value={proposalTitle}
              onChange={(e) => setProposalTitle(e.target.value)}
              placeholder="Enter proposal title..."
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="input-label">Description</label>
            <textarea
              value={proposalDescription}
              onChange={(e) => setProposalDescription(e.target.value)}
              placeholder="Describe your proposal in detail..."
              className="form-textarea"
              rows={4}
            />
          </div>
          
          <button
            onClick={handleCreateProposal}
            disabled={loading || !proposalTitle || !proposalDescription}
            className="panel-btn panel-btn-primary"
          >
            {loading ? 'Creating...' : 'Create Proposal'}
          </button>
        </div>
      </div>
    </div>
  );
}

