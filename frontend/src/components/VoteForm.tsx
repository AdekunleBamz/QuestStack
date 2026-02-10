/**
 * VoteForm Component
 * Form for voting on proposals
 * 
 * @component
 */

interface VoteFormProps {
  proposalId: number;
  onVote?: (id: number, support: boolean) => void;
}

export function VoteForm({ proposalId, onVote }: VoteFormProps) {
  return (
    <div className="vote-form">
      <button onClick={() => onVote?.(proposalId, true)} className="vote-for">
        Vote For
      </button>
      <button onClick={() => onVote?.(proposalId, false)} className="vote-against">
        Vote Against
      </button>
    </div>
  );
}
