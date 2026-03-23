export function PageSpinner() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600 dark:border-gray-700 dark:border-t-blue-400" />
    </div>
  );
}
