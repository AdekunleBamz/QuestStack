/**
 * Avatar Component
 * User avatar display
 * 
 * @component
 */

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: number;
}

export function Avatar({ src, alt = 'User', size = 40 }: AvatarProps) {
  return (
    <img 
      src={src} 
      alt={alt} 
      className="avatar"
      style={{ width: size, height: size }}
    />
  );
}
