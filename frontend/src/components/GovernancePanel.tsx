/**
 * GovernancePanel Component
 * UI for viewing and voting on proposals
 * 
 * @component
 */

'use client';

interface Proposal {
  id: number;
  title: string;
  description: string;
  status: string;
  votesFor: number;
  votesAgainst: number;
  endTime: number;
}

interface GovernancePanelProps {
  proposals: Proposal[];
  onVote?: (proposalId: number, support: boolean) => void;
  onCreateProposal?: () => void;
}

export function GovernancePanel({
  proposals,
  onVote,
  onCreateProposal,
}: GovernancePanelProps) {
  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString();
  };

  return (
    <div className="governance-panel">
      <div className="panel-header">
        <h2>Governance</h2>
        <button onClick={onCreateProposal}>New Proposal</button>
      </div>

      <div className="proposals-list">
        {proposals.map((proposal) => (
          <div key={proposal.id} className="proposal-card">
            <h3>{proposal.title}</h3>
            <p>{proposal.description}</p>
            
            <div className="proposal-meta">
              <span className="status">Status: {proposal.status}</span>
              <span className="deadline">Ends: {formatTime(proposal.endTime)}</span>
            </div>

            <div className="vote-stats">
              <span className="for">For: {proposal.votesFor}</span>
              <span className="against">Against: {proposal.votesAgainst}</span>
            </div>

            <div className="vote-actions">
              <button onClick={() => onVote?.(proposal.id, true)}>
                Vote For
              </button>
              <button onClick={() => onVote?.(proposal.id, false)}>
                Vote Against
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
