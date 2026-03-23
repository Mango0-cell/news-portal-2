export function CardSkeleton() {
  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="aspect-video bg-gray-200 dark:bg-gray-800 animate-pulse" />
      <div className="p-4 space-y-3">
        <div className="h-3 w-20 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse" />
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
        <div className="h-3 w-2/3 bg-gray-200 dark:bg-gray-800 rounded-full animate-pulse" />
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="w-full aspect-[4/3] sm:aspect-[21/9] rounded-xl bg-gray-200 dark:bg-gray-800 animate-pulse" />
  );
}

export function ResultCardSkeleton() {
  return (
    <div className="flex gap-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 p-5 animate-pulse">
      <div className="hidden sm:block w-20 h-20 rounded-xl bg-gray-200 dark:bg-gray-800 shrink-0" />
      <div className="flex-1 space-y-3">
        <div className="flex gap-2">
          <div className="h-3 w-16 bg-gray-200 dark:bg-gray-800 rounded-full" />
          <div className="h-3 w-24 bg-gray-200 dark:bg-gray-800 rounded-full" />
        </div>
        <div className="h-5 w-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-800 rounded-lg" />
        <div className="h-3 w-full bg-gray-200 dark:bg-gray-800 rounded-full" />
        <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-800 rounded-full" />
      </div>
    </div>
  );
}
