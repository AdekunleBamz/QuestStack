/**
 * Box Component
 * Generic container
 * 
 * @component
 */

interface BoxProps {
  children: React.ReactNode;
  padding?: number;
}

export function Box({ children, padding = 16 }: BoxProps) {
  return (
    <div className="box" style={{ padding }}>
      {children}
    </div>
  );
}
