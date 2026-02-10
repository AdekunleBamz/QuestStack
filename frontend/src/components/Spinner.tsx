/**
 * Spinner Component
 * Loading spinner
 * 
 * @component
 */

interface SpinnerProps {
  size?: number;
}

export function Spinner({ size = 24 }: SpinnerProps) {
  return (
    <div className="spinner" style={{ width: size, height: size }}>
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
}
