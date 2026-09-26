"use client";

import DataTable from "@/components/Table";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";
import useProductsList from "@/features/products/hooks/use-products-list";
import useDebounce from "@/hooks/use-debounce";
import { Button, Card, Dropdown, Input, Space, Tag } from "antd";
import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import useFeatures from "../hooks/use-features";
import useUpdateFeatureStatus from "../hooks/use-update-feature-status";
import { Feature } from "../types/features.types";
import getFeaturesColumns from "./features.columns";

const STATUS_OPTIONS = [
  { key: "", label: "All" },
  { key: "true", label: "Active" },
  { key: "false", label: "Inactive" },
];

const FeaturesTable = () => {
  const openModal = useOpenModal();
  const { data: products, refetch: fetchProducts } = useProductsList();
  const { mutate: updateFeatureStatus } = useUpdateFeatureStatus();

  const productOptions = useMemo(
    () => (Array.isArray(products) ? products.map((p) => ({ label: p.name, key: p.id })) : []),
    [products],
  );

  const [filters, setFilters] = useState({
    search: "",
    isActive: null as boolean | null,
    productId: null as string | null,
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });
  const [statusLoadingId, setStatusLoadingId] = useState<string | null>(null);

  const search = useDebounce(filters.search);

  const { data, isLoading, isFetching } = useFeatures({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
    isActive: filters.isActive,
    productId: filters.productId ?? undefined,
  });

  const columns = useMemo(() => getFeaturesColumns({
    onView: (f) => openModal("VIEW_FEATURE", f),
    onEdit: (f) => openModal("UPDATE_FEATURE", f),
    onDelete: (f) => openModal("DELETE_FEATURE", f),
    onToggleStatus: (f, isActive) => {
      if (!f.id) return;
      setStatusLoadingId(f.id);
      updateFeatureStatus({ id: f.id, isActive }, { onSettled: () => setStatusLoadingId(null) });
    },
    statusLoadingIds: statusLoadingId ? [statusLoadingId] : [],
  }),
  [openModal, statusLoadingId, updateFeatureStatus],
  );

  const total = data?.statistics?.total ?? 0;
  const active = data?.statistics?.active ?? 0;
  const inactive = data?.statistics?.inactive ?? 0;

  const resetPage = () => setPagination((prev) => ({ ...prev, skip: 0 }));

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    resetPage();
  };

  const handleStatusChange = (key: string) => {
    setFilters((prev) => ({ ...prev, isActive: key === "" ? null : key === "true" }));
    resetPage();
  };

  const handleProductChange = (key: string) => {
    setFilters((prev) => ({ ...prev, productId: key === "" ? null : key }));
    resetPage();
  };

  const currentStatusLabel =
    filters.isActive === null
      ? "Filter"
      : STATUS_OPTIONS.find((o) => o.key === String(filters.isActive))?.label ?? "Filter";

  const currentProductLabel = filters.productId
    ? productOptions.find((o) => o.key === filters.productId)?.label ?? "Filter By Product"
    : "Filter By Product";

  const cardTitle = (
    <Space
      size="small"
      className="w-full flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-0"
    >
      <span className="font-semibold text-lg">Features</span>
      <Space size="small">
        <Tag color="blue">Total: {total}</Tag>
        <Tag color="green">Active: {active}</Tag>
        <Tag color="red">Inactive: {inactive}</Tag>
      </Space>
    </Space>
  );

  return (
    <Card title={cardTitle}>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 sm:p-4">
        <Input
          allowClear
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<Search size={15} className="text-gray-400 mr-1" />}
          placeholder="Search by feature name..."
          className="flex-1 min-w-52"
        />

        <Dropdown
          trigger={["hover"]}
          menu={{
            items: STATUS_OPTIONS,
            selectable: true,
            selectedKeys: [filters.isActive === null ? "" : String(filters.isActive)],
            onClick: ({ key }) => handleStatusChange(key),
          }}
        >
          <Button icon={<Filter size={14} />}>{currentStatusLabel}</Button>
        </Dropdown>

        <Dropdown
          trigger={["hover"]}
          onOpenChange={(open) => {
            if (open) fetchProducts();
          }}
          menu={{
            items: [{ key: "", label: "All" }, ...productOptions],
            selectable: true,
            selectedKeys: [filters.productId ?? ""],
            onClick: ({ key }) => handleProductChange(key),
          }}
        >
          <Button icon={<Filter size={14} />}>{currentProductLabel}</Button>
        </Dropdown>
      </div>

      <DataTable<Feature>
        data={data?.features ?? []}
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

export default FeaturesTable;