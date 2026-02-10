/**
 * Text Component
 * Typography component
 * 
 * @component
 */

interface TextProps {
  children: React.ReactNode;
  variant?: 'body' | 'heading' | 'caption';
}

export function Text({ children, variant = 'body' }: TextProps) {
  const Tag = variant === 'heading' ? 'h2' : variant === 'caption' ? 'small' : 'p';
  return <Tag className={`text text-${variant}`}>{children}</Tag>;
}
