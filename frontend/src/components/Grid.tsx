/**
 * Grid Component
 * CSS Grid layout wrapper
 * 
 * @component
 */

interface GridProps {
  children: React.ReactNode;
  columns?: number | string;
  gap?: number;
}

export function Grid({ children, columns = 3, gap = 16 }: GridProps) {
  return (
    <div 
      className="grid"
      style={{ 
        display: 'grid',
        gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
        gap,
      }}
    >
      {children}
    </div>
  );
}
