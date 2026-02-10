/**
 * Textarea Component
 * Multi-line text input
 * 
 * @component
 */

interface TextareaProps {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Textarea({ label, placeholder, value, onChange }: TextareaProps) {
  return (
    <div className="textarea-group">
      {label && <label>{label}</label>}
      <textarea
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
}
