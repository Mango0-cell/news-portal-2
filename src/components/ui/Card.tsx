import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border overflow-hidden',
        'bg-white dark:bg-gray-800',
        'border-gray-200 dark:border-gray-700',
        className,
      )}
    >
      {children}
    </div>
  );
}
