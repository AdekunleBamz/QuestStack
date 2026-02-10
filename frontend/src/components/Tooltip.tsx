/**
 * Tooltip Component
 * Hover tooltip
 * 
 * @component
 */

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export function Tooltip({ content, children }: TooltipProps) {
  return (
    <div className="tooltip-wrapper">
      {children}
      <div className="tooltip">{content}</div>
    </div>
  );
}
