/**
 * HelperText Component
 * Form helper text
 * 
 * @component
 */

interface HelperTextProps {
  children: React.ReactNode;
  error?: boolean;
}

export function HelperText({ children, error }: HelperTextProps) {
  return <span className={`helper-text ${error ? 'error' : ''}`}>{children}</span>;
}
