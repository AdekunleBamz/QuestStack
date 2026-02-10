/**
 * Flex Component
 * Flexbox layout wrapper
 * 
 * @component
 */

interface FlexProps {
  children: React.ReactNode;
  direction?: 'row' | 'column';
  gap?: number;
  justify?: string;
  align?: string;
}

export function Flex({ children, direction = 'row', gap, justify, align }: FlexProps) {
  return (
    <div 
      className="flex"
      style={{ 
        display: 'flex',
        flexDirection: direction,
        gap,
        justifyContent: justify,
        alignItems: align,
      }}
    >
      {children}
    </div>
  );
}
