/**
 * Icon Component
 * SVG icon wrapper
 * 
 * @component
 */

interface IconProps {
  name: string;
  size?: number;
}

export function Icon({ name, size = 24 }: IconProps) {
  return (
    <svg className={`icon icon-${name}`} style={{ width: size, height: size }}>
      <use href={`/icons/${name}.svg`} />
    </svg>
  );
}
