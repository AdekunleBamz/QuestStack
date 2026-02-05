/**
 * Skeleton Loader Component
 * Placeholder loading states for content
 */

interface SkeletonProps {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({
  variant = 'text',
  width,
  height,
  className = '',
}: SkeletonProps) {
  const variantClasses = {
    text: 'skeleton-text',
    circular: 'skeleton-circular',
    rectangular: 'skeleton-rectangular',
  };

  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'text' ? '1em' : undefined),
  };

  return (
    <div
      className={`skeleton ${variantClasses[variant]} ${className}`}
      style={style}
    />
  );
}

// Preset skeleton components for common use cases
export function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <Skeleton variant="rectangular" height={120} />
      <div className="skeleton-card-content">
        <Skeleton variant="text" width="70%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="40%" />
      </div>
    </div>
  );
}
