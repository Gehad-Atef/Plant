// src/components/PostSkeleton.jsx
export default function PostSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow animate-pulse space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-300 dark:bg-gray-700 rounded-full" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32" />
          <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4" />
      <div className="h-40 bg-gray-300 dark:bg-gray-700 rounded" />
    </div>
  );
}
