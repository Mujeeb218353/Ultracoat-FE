"use client";

import DataTable from "@/components/Table";
import useDebounce from "@/hooks/use-debounce";
import { Filters } from "@/utils/types";
import { Button, Card, Dropdown, Input, Space, Tag } from "antd";
import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import useFeedbacks from "../hooks/use-feedbacks";
import { Feedback, FeedbackStatus } from "../types/feedback.types";
import FeedbackKpiCards from "./FeedbackKpiCards";
import getFeedbacksColumns from "./feedbacks.columns";

const STATUS_OPTIONS = [
  { key: "All", label: "Filter By Status" },
  { key: "PENDING", label: "PENDING" },
  { key: "SUBMITTED", label: "SUBMITTED" },
];

const FeedbacksTable = () => {
  const router = useRouter();
  const [filters, setFilters] = useState<Filters<FeedbackStatus>>({ search: "", status: null });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const search = useDebounce(filters.search);
  const query = {
    skip: pagination.skip,
    limit: pagination.limit,
    search,
    status: filters.status,
  };
  const { data, isLoading, isFetching } = useFeedbacks(query);

  const columns = useMemo(() => getFeedbacksColumns({
    onView: (feedback) => feedback.id && router.push(`/feedbacks/${feedback.id}`),
  }), [router]);

  const resetPage = () => setPagination((previous) => ({ ...previous, skip: 0 }));

  const cardTitle = (
    <Space className="w-full flex! flex-col! items-start! justify-between! gap-2! sm:flex-row! sm:items-center!">
      <span className="font-semibold text-lg">Feedbacks</span>
      <Space size="small" className="flex! flex-wrap! gap-2!">
        <Tag color="orange">Pending: {data?.counts.pending ?? 0}</Tag>
        <Tag color="green">Submitted: {data?.counts.submitted ?? 0}</Tag>
      </Space>
    </Space>
  );

  return (
    <div className="flex flex-col gap-4 p-5">
      <FeedbackKpiCards statistics={data?.statistics} total={data?.counts.total ?? data?.total} loading={isLoading} />
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
          placeholder="Search by customer, company, email, or phone..."
          className="min-w-52 flex-1"
        />
        <Dropdown
          trigger={["click"]}
          menu={{
            items: STATUS_OPTIONS,
            selectable: true,
            selectedKeys: [filters.status ?? "All"],
            onClick: ({ key }) => {
              setFilters((previous) => ({
                ...previous,
                status: key === "All" ? null : key as FeedbackStatus,
              }));
              resetPage();
            },
          }}
        >
          <Button icon={<Filter size={15} />}>
            {filters.status ?? "Filter By Status"}
          </Button>
        </Dropdown>
      </div>

      <DataTable<Feedback>
        data={data?.feedbacks ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        total={data?.total}
        skip={pagination.skip}
        limit={pagination.limit}
        onPageChange={(skip, limit) => setPagination({ skip, limit })}
        rowKey="id"
      />
    </Card>
    </div>
  );
};

export default FeedbacksTable;
