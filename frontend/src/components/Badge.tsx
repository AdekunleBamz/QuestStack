/**
 * Badge Component
 * Status badge for quests/proposals
 * 
 * @component
 */

interface BadgeProps {
  status: 'active' | 'completed' | 'cancelled' | 'passed' | 'rejected';
}

export function Badge({ status }: BadgeProps) {
  return <span className={`badge badge-${status}`}>{status}</span>;
}
