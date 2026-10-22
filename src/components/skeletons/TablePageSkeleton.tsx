import PageHeaderSkeleton from "@/components/skeletons/PageHeaderSkeleton";
import TableCardSkeleton from "@/components/skeletons/TableCardSkeleton";
import TableSkeleton from "@/components/skeletons/TableSkeleton";

interface TablePageSkeletonProps {
  variant?: "card" | "table";
  isBtnVisible?: boolean;
}

const TablePageSkeleton = ({ variant = "card", isBtnVisible = false }: TablePageSkeletonProps) => {
  if (variant === "table") {
    return (
      <div className="w-full flex flex-col gap-6">
        <PageHeaderSkeleton isBtnVisible={isBtnVisible} />
        <div className="px-4 flex flex-col gap-6 mb-4">
          <TableSkeleton rows={6} columns={4} />
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeaderSkeleton isBtnVisible={isBtnVisible} />
      <div className="flex-1 p-5">
        <TableCardSkeleton />
      </div>
    </div>
  );
};

export default TablePageSkeleton;
