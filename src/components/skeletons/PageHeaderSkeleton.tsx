
interface PageHeaderSkeletonProps {
  isBtnVisible?: boolean;
};

const PageHeaderSkeleton = ({ isBtnVisible = true }: PageHeaderSkeletonProps) => {
  return (
    <div>
        <div className="h-40 md:h-20 bg-white dark:bg-[#222222] flex flex-col md:flex-row items-center justify-between border-b border-gray-100 dark:border-white/10 p-4">
          <div className="flex flex-col items-center sm:items-start gap-1">
            <div className="w-80 h-8 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
            <div className="w-50 h-4 mt-2 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          </div>
          {isBtnVisible && (
            <div className="w-48 h-8 rounded bg-gray-200 dark:bg-white/10 animate-pulse" />
          )}
        </div>
    </div>
  )
};

export default PageHeaderSkeleton;