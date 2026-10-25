"use client";

import DataTable from "@/components/Table";
import useDebounce from "@/hooks/use-debounce";
import { Filters } from "@/utils/types";
import { Card, Input, Space, Tag } from "antd";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import useQuotationsWithFollowUps from "../hooks/use-quotations-follow-ups";
import { FollowUpWithQuotation } from "../types/follow-ups.types";
import getQuotationsColumns from "./quotations-with-follow-ups.columns";

const QuotationsWithFollowUpsTable = () => {
  const router = useRouter();

  const [filters, setFilters] = useState<Filters>({
    search: "",
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  const search = useDebounce(filters.search);
  
  const { data, isLoading, isFetching } = useQuotationsWithFollowUps({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
  });

  const columns = useMemo(() => getQuotationsColumns({
    onView: (f) => {
      router.push(`/follow-ups/${f.id}`);
    },
  }), [router]);

  const resetPage = () => setPagination((prev) => ({ ...prev, skip: 0 }));

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    resetPage();
  };

  const cardTitle = (
    <Space
      size="small"
      className="w-full flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-0"
    >
      <span className="font-semibold text-lg">Follow Ups</span>
      <Space size="small" className="flex! flex-wrap! gap-2! justify-center! sm:justify-end!">
        <Tag color="blue">Total: {data?.statistics?.total ?? 0}</Tag>
        <Tag color="red">Overdue: {data?.statistics?.totalOverdue ?? 0}</Tag>
        <Tag color="green">Incoming: {data?.statistics?.totalIncoming ?? 0}</Tag>
      </Space>
    </Space>
  );

  return (
      <Card title={cardTitle}>
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-3 sm:p-4 mb-2 sm:mb-0">
          <Input
            allowClear
            value={filters.search}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<Search size={15} className="text-gray-400 mr-1" />}
            placeholder="Search by product, customer name, email, or phone..."
            className="flex-1 min-w-52"
          />
        </div>
  
        <DataTable<FollowUpWithQuotation>
          data={data?.quotations ?? []}
          columns={columns}
          loading={isLoading || isFetching}
          total={data?.total}
          skip={pagination.skip}
          limit={pagination.limit}
          onPageChange={(newSkip, newLimit) => setPagination({ skip: newSkip, limit: newLimit })}
          rowKey="id"
        />
      </Card>
    );

};

export default QuotationsWithFollowUpsTable;