/**
 * Button Component
 * Styled button
 * 
 * @component
 */

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger';
  children: React.ReactNode;
}

export function Button({ variant = 'primary', children }: ButtonProps) {
  return <button className={`btn btn-${variant}`}>{children}</button>;
}
