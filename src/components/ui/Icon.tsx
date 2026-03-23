import { cn } from '../../lib/utils';

interface IconProps {
  name: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = { sm: 'text-[18px]', md: 'text-[24px]', lg: 'text-[32px]' };

export function Icon({ name, className, size = 'md' }: IconProps) {
  return (
    <span
      className={cn('material-icons-round select-none', sizes[size], className)}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}
