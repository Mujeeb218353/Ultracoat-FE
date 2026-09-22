"use client";

import { useMemo, useState } from "react";
import { Button, Card, Dropdown, Input, Space, Tag } from "antd";
import { Filter, Search } from "lucide-react";
import DataTable from "@/components/Table";
import useDebounce from "@/hooks/use-debounce";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";
import useSizes from "../hooks/use-sizes";
import useUpdateSizeStatus from "../hooks/use-update-size-status";
import getSizesColumns from "./sizes.columns";
import { Size } from "../types/sizes.types";

const STATUS_OPTIONS = [
  { key: "", label: "All" },
  { key: "true", label: "Active" },
  { key: "false", label: "In Active" },
];

const SizesTable = () => {
  const openModal = useOpenModal();
  const { mutate: updateSizeStatus } = useUpdateSizeStatus();

  const [filters, setFilters] = useState({
    search: "",
    isActive: null as boolean | null,
  });
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);

  const search = useDebounce(filters.search);

  const { data, isLoading, isFetching } = useSizes({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
    isActive: filters.isActive,
  });

  const columns = useMemo(() => getSizesColumns({
        onView: (size) => openModal("VIEW_SIZE", size),
        onEdit: (size) => openModal("UPDATE_SIZE", size),
        onDelete: (size) => openModal("DELETE_SIZE", size),
        onToggleStatus: (size, isActive) => {
          if (!size.id) return;

          setStatusLoadingId(size.id);
          updateSizeStatus(
            { id: size.id, isActive },
            {
              onSettled: () => setStatusLoadingId(null),
            },
          );
        },
        statusLoadingIds: statusLoadingId ? [statusLoadingId] : [],
      }),
    [openModal, statusLoadingId, updateSizeStatus],
  );

  const total = data?.statistics.total ?? 0;
  const active = data?.statistics.active ?? 0;
  const inactive = data?.statistics.inactive ?? 0;

  const currentStatusLabel = filters.isActive === null ? "Filter" : STATUS_OPTIONS.find((o) => o.key === String(filters.isActive))?.label ?? "Filter";

  return (
    <Card
      title={
        <Space size="small" className="w-full flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-0">
          <span className="font-semibold text-lg">Die Sizes</span>
          <Space size="small">
            <Tag color="blue">Total: {total}</Tag>
            <Tag color="green">Active: {active}</Tag>
            <Tag color="red">In Active: {inactive}</Tag>
          </Space>
        </Space>
      }
    >
      <div className="flex flex-col lg:flex-row items-center gap-1 sm:gap-3 sm:p-4">
        <Input
          allowClear
          value={filters.search}
          onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
          prefix={<Search size={15} className="text-gray-400 mr-1" />}
          placeholder="Search by size name..."
          className="flex-1 min-w-52"
        />

        <Dropdown
          trigger={["hover"]}
          menu={{
            items: STATUS_OPTIONS,
            selectable: true,
            selectedKeys: [filters.isActive === null ? "" : String(filters.isActive)],
            onClick: ({ key }) => setFilters((prev) => ({ ...prev, isActive: key === "" ? null : key === "true" })),
          }}
        >
          <Button icon={<Filter size={14} />}>{currentStatusLabel}</Button>
        </Dropdown>
      </div>

      <DataTable<Size>
        data={data?.sizes ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        total={data?.total}
        skip={pagination.skip}
        limit={pagination.limit}
        onPageChange={(newSkip, newLimit) => setPagination((prev) => ({ ...prev, skip: newSkip, limit: newLimit }))}
        rowKey="id"
      />
    </Card>
  );
};

export default SizesTable;