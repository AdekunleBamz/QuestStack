/**
 * Dropdown Component
 * Menu dropdown
 * 
 * @component
 */

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownProps {
  trigger: React.ReactNode;
  items: DropdownItem[];
}

export function Dropdown({ trigger, items }: DropdownProps) {
  return (
    <div className="dropdown">
      {trigger}
      <div className="dropdown-menu">
        {items.map((item, index) => (
          <button key={index} onClick={item.onClick}>{item.label}</button>
        ))}
      </div>
    </div>
  );
}
