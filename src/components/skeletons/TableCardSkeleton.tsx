"use client";

import { Card, Skeleton } from "antd";
import TableSkeleton from "./TableSkeleton";

interface TableCardSkeletonProps {
  columns?: number;
  rows?: number;
}

const TableCardSkeleton = ({ columns = 5, rows = 8 }: TableCardSkeletonProps) => (
  <Card className="dark:bg-[#222222]"
    title={
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 my-4 sm:my-0">
        <Skeleton.Input active size="small" style={{ width: 120 }} />
        <div className="flex gap-2">
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
          <Skeleton.Button active size="small" />
        </div>
      </div>
    }
  >
    <div className="sm:p-4 mb-2">
      <Skeleton.Input active block />
    </div>
    <TableSkeleton columns={columns} rows={rows} showToolbar={false} className="border-0! shadow-none!" />
  </Card>
);

export default TableCardSkeleton;
