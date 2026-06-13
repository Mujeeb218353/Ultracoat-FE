
interface PageHeaderSkeletonProps {
  isBtnVisible?: boolean;
};

const PageHeaderSkeleton = ({ isBtnVisible = true }: PageHeaderSkeletonProps) => {
  return (
    <div>
        <div className="h-40 md:h-20 bg-white flex flex-col md:flex-row items-center justify-between border-b border-gray-100 p-4">
          <div>
            <div className="w-80 h-8 rounded bg-gray-200 animate-pulse" />
            <div className="w-50 h-4 mt-2 rounded bg-gray-200 animate-pulse" />
          </div>
          {isBtnVisible && (
            <div className="w-24 h-10 rounded bg-gray-200 animate-pulse" />
          )}
        </div>
    </div>
  )
};

export default PageHeaderSkeleton;