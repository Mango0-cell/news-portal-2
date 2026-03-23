import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Icon } from './Icon';

interface ArticleImageProps {
  src: string | null;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  aspectRatio?: string;
  iconSize?: 'sm' | 'md' | 'lg';
}

export function ArticleImage({
  src,
  alt,
  className,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw',
  priority = false,
  aspectRatio = 'aspect-video',
  iconSize = 'lg',
}: ArticleImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (!src || error) {
    return (
      <div
        className={cn(
          aspectRatio,
          'w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center',
          className,
        )}
      >
        <Icon name="article" size={iconSize} className="text-gray-300 dark:text-gray-600" />
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {/* Low-quality blur placeholder */}
      {!loaded && (
        <div
          className={cn(
            aspectRatio,
            'absolute inset-0 w-full bg-gray-200 dark:bg-gray-800 animate-pulse',
          )}
        />
      )}
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        sizes={sizes}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          'w-full h-full object-cover',
          aspectRatio,
          'transition-opacity duration-300',
          loaded ? 'opacity-100' : 'opacity-0',
        )}
      />
    </div>
  );
}
