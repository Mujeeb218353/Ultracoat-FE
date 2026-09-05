interface TableSkeletonProps {
  rows?: number;
  columns?: number;
  showToolbar?: boolean;
  showFooter?: boolean;
  className?: string;
}

const TableSkeleton = ({
  rows = 6,
  columns = 4,
  showToolbar = true,
  showFooter = true,
  className = "",
}: TableSkeletonProps) => {
  return (
    <div className={`rounded-2xl border border-gray-100 dark:border-white/10 bg-white dark:bg-white/5 shadow-sm overflow-hidden ${className}`}>
      {showToolbar && (
        <div className="p-4 md:p-5 space-y-4 border-b border-gray-100 dark:border-white/10">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="h-11 flex-1 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="h-11 w-full sm:w-36 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="h-11 w-full sm:w-28 rounded-xl bg-gray-200 dark:bg-white/10 animate-pulse" />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="h-8 w-24 rounded-full bg-gray-200 dark:bg-white/10 animate-pulse" />
          </div>
        </div>
      )}

      <div className="overflow-hidden">
        <div className="bg-gray-50 dark:bg-white/5 px-4 py-3 border-b border-gray-100 dark:border-white/10">
          <div
            className="grid gap-3"
            style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: columns }).map((_, index) => (
              <div key={index} className="h-4 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
            ))}
          </div>
        </div>

        <div className="divide-y divide-gray-100 dark:divide-white/10">
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} className="px-4 py-4">
              <div
                className="grid gap-3 items-center"
                style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
              >
                {Array.from({ length: columns }).map((_, columnIndex) => (
                  <div
                    key={columnIndex}
                    className={`h-4 rounded bg-gray-200 dark:bg-white/10 animate-pulse ${columnIndex === 0 ? "w-3/4" : "w-full"}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {showFooter && (
          <div className="px-4 py-3 border-t border-gray-100 dark:border-white/10 bg-gray-50/60 dark:bg-white/5">
            <div className="h-4 w-32 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default TableSkeleton;