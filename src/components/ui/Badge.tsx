import { cn } from '../../lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'accent';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variant === 'default' &&
          'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
        variant === 'accent' &&
          'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
        className,
      )}
    >
      {children}
    </span>
  );
}
