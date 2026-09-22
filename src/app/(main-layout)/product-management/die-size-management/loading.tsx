import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-6">
      <PageHeaderSkeleton isBtnVisible />
      <div className="px-4 flex flex-col gap-6 mb-4">
        <TableSkeleton rows={6} columns={4} />
      </div>
    </div>
  );
};

export default Loading;