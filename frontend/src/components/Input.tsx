/**
 * Input Component
 * Form input field
 * 
 * @component
 */

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function Input({ label, type = 'text', placeholder, value, onChange }: InputProps) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="input-field"
      />
    </div>
  );
}
