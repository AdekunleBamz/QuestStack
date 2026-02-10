/**
 * ProgressBar Component
 * Progress indicator for voting/quests
 * 
 * @component
 */

interface ProgressBarProps {
  value: number;
  max: number;
  showPercentage?: boolean;
}

export function ProgressBar({ value, max, showPercentage = true }: ProgressBarProps) {
  const percentage = Math.min((value / max) * 100, 100);
  
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${percentage}%` }} />
      {showPercentage && <span className="progress-label">{percentage.toFixed(1)}%</span>}
    </div>
  );
}
