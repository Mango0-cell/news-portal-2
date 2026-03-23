interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="rounded-lg border p-4 text-center
        bg-red-50 border-red-200 text-red-700
        dark:bg-red-900/20 dark:border-red-800 dark:text-red-400"
    >
      <p>{message}</p>
    </div>
  );
}
