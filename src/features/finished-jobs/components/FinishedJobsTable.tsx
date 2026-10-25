"use client";

import DataTable from "@/components/Table";
import useDebounce from "@/hooks/use-debounce";
import { Filters } from "@/utils/types";
import { Button, Card, Dropdown, Input, Space, Tag } from "antd";
import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useFinishedJobs from "../hooks/use-finished-jobs";
import { FinishedJobListItem, FinishedJobStatus } from "../types/finished-jobs.types";
import getFinishedJobsColumns from "./finished-jobs.columns";

const STATUS_OPTIONS = [
  { key: "All", label: "Filter By Status" },
  { key: "PENDING", label: "PENDING" },
  { key: "SUBMITTED", label: "SUBMITTED" },
];

const FinishedJobsTable = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters<FinishedJobStatus>>({ search: "", status: null });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const search = useDebounce(filters.search);

  const { data, isLoading, isFetching } = useFinishedJobs({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
    status: filters.status,
  });

  const columns = useMemo(() => getFinishedJobsColumns({
    onView: (job) => router.push(`/finished-jobs/${job.quotation.id}`),
  }), [router]);

  const resetPage = () => setPagination((previous) => ({ ...previous, skip: 0 }));
  const selectedStatus = filters.status ?? "";

  const cardTitle = (
    <Space className="w-full flex! flex-col! items-start! justify-between! gap-2! sm:flex-row! sm:items-center!">
      <span className="font-semibold text-lg">Finished Jobs</span>
      <Tag color="blue">Total: {data?.total ?? 0}</Tag>
    </Space>
  );

  return (
    <Card title={cardTitle}>
      <div className="mb-2 flex flex-col items-center gap-3 sm:mb-0 sm:flex-row sm:p-4">
        <Input
          allowClear
          value={filters.search ?? ""}
          onChange={(event) => {
            setFilters((previous) => ({ ...previous, search: event.target.value }));
            resetPage();
          }}
          prefix={<Search size={15} className="mr-1 text-gray-400" />}
          placeholder="Search finished jobs..."
          className="min-w-52 flex-1"
        />
        <Dropdown
          trigger={["click"]}
          menu={{
            items: STATUS_OPTIONS,
            selectable: true,
            selectedKeys: [selectedStatus],
            onClick: ({ key }) => {
              setFilters((previous) => ({
                ...previous,
                status: key ? key as FinishedJobStatus : null,
              }));
              resetPage();
            },
          }}
        >
          <Button icon={<Filter size={15} />}>
            {filters.status || "Filter By Status"}
          </Button>
        </Dropdown>
      </div>

      <DataTable<FinishedJobListItem>
        data={data?.finishedJobs ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        total={data?.total}
        skip={pagination.skip}
        limit={pagination.limit}
        onPageChange={(skip, limit) => setPagination({ skip, limit })}
        rowKey="id"
      />
    </Card>
  );
};

export default FinishedJobsTable;
