/**
 * Select Component
 * Dropdown select
 * 
 * @component
 */

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
}

export function Select({ label, options, value, onChange }: SelectProps) {
  return (
    <div className="select-group">
      {label && <label>{label}</label>}
      <select value={value} onChange={(e) => onChange?.(e.target.value)}>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
    </div>
  );
}
