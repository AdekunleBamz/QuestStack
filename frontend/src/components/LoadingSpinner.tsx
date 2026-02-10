/**
 * LoadingSpinner Component
 * Simple loading indicator
 * 
 * @component
 */

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
}

export function LoadingSpinner({ size = 'medium' }: LoadingSpinnerProps) {
  const sizeMap = { small: 16, medium: 24, large: 40 };
  const pixelSize = sizeMap[size];
  
  return (
    <div 
      className="loading-spinner"
      style={{ width: pixelSize, height: pixelSize }}
    >
      <svg viewBox="0 0 50 50">
        <circle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </svg>
    </div>
  );
}
