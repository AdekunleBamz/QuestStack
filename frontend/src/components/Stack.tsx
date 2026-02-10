/**
 * Stack Component
 * Vertical stack layout
 * 
 * @component
 */

interface StackProps {
  children: React.ReactNode;
  spacing?: number;
}

export function Stack({ children, spacing = 16 }: StackProps) {
  return (
    <div className="stack" style={{ display: 'flex', flexDirection: 'column', gap: spacing }}>
      {children}
    </div>
  );
}
