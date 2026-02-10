/**
 * Space Component
 * Spacing element
 * 
 * @component
 */

interface SpaceProps {
  size?: number;
}

export function Space({ size = 8 }: SpaceProps) {
  return <div style={{ height: size }} />;
}
