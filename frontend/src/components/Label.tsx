/**
 * Label Component
 * Form label
 * 
 * @component
 */

interface LabelProps {
  children: React.ReactNode;
  htmlFor?: string;
}

export function Label({ children, htmlFor }: LabelProps) {
  return <label htmlFor={htmlFor} className="label">{children}</label>;
}
