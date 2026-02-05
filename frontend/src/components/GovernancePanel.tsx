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
    return <p>Please connect your wallet to participate in governance</p>;
  }

  const handleCreateProposal = () => {
    if (proposalTitle && proposalDescription) {
      createProposal(
        proposalTitle,
        proposalDescription,
        process.env.NEXT_PUBLIC_QUEST_CONTRACT || '',
        'update-quest-parameters'
      );
    }
  };

  const handleVote = (proposalId: number, support: boolean) => {
    vote(proposalId, support);
  };

  return (
    <div className="governance-panel">
      <h2>Governance</h2>
      <div>
        <input
          type="text"
          value={proposalTitle}
          onChange={(e) => setProposalTitle(e.target.value)}
          placeholder="Proposal Title"
        />
        <textarea
          value={proposalDescription}
          onChange={(e) => setProposalDescription(e.target.value)}
          placeholder="Proposal Description"
        />
        <button onClick={handleCreateProposal} disabled={loading}>
          {loading ? 'Processing...' : 'Create Proposal'}
        </button>
      </div>
    </div>
  );
}

