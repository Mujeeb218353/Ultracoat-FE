"use client";

import DataTable from "@/components/Table";
import useProductsList from "@/features/products/hooks/use-products-list";
import useDebounce from "@/hooks/use-debounce";
import { Button, Card, Dropdown, Input, Space, Tag } from "antd";
import { Filter, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Filters, Status } from "@/utils/types";
import useQuotations from "../hooks/use-quotations";
import { Quotation } from "../types/quotations.types";
import getQuotationsColumns from "./quotations.columns";
import { useRouter } from "next/navigation";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";

const STATUS_OPTIONS = [
  { key: "", label: "All" },
  { key: "PENDING", label: "PENDING" },
  { key: "QUOTED", label: "QUOTED" },
  { key: "SENT TO CUSTOMER", label: "SENT TO CUSTOMER" },
  { key: "APPROVED", label: "APPROVED" },
  { key: "REJECTED", label: "REJECTED" },
  { key: "RE QUOTE", label: "RE QUOTE" },
];

const QuotationsTable = () => {
  const openModal = useOpenModal();
  const router = useRouter();
  const { data: products, refetch: fetchProducts } = useProductsList({ enabled: false });
  const productOptions = useMemo(() => (Array.isArray(products) ? products.map((p) => ({ label: p.name, key: p.id })) : []), [products]);

  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: null,
    productId: null,
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  const search = useDebounce(filters.search);
  
  const { data, isLoading, isFetching } = useQuotations({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
    status: filters.status,
    productId: filters.productId ?? undefined,
  });

  const columns = useMemo(() => getQuotationsColumns({
    onView: (q) => {
      router.push(`/quotations/${q.id}`);
    },
    onEdit: (q) => {
      router.push(`/quotations/${q.id}`);
    },
    onDelete: (q) => {
      openModal("DELETE_QUOTATION", q);
    },
  }), [openModal, router]);

  const resetPage = () => setPagination((prev) => ({ ...prev, skip: 0 }));

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    resetPage();
  };

  const handleStatusChange = (key: string) => {
    setFilters((prev) => ({ ...prev, status: key === "" ? null : (key as Status) }));
    resetPage();
  };

  const handleProductChange = (key: string) => {
    setFilters((prev) => ({ ...prev, productId: key === "" ? null : key }));
    resetPage();
  };

  const cardTitle = (
    <Space
      size="small"
      className="w-full flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-0"
    >
      <span className="font-semibold text-lg">Quotations</span>
      <Space size="small" className="flex! flex-wrap! gap-2! justify-center! sm:justify-end!">
        <Tag color="blue">Total: {data?.statistics?.total ?? 0}</Tag>
        <Tag color="gray">Pending: {data?.statistics?.pending ?? 0}</Tag>
        <Tag color="purple">Quoted: {data?.statistics?.quoted ?? 0}</Tag>
        <Tag color="orange">Sent To Customer: {data?.statistics?.sentToCustomer ?? 0}</Tag>
        <Tag color="green">Approved: {data?.statistics?.approved ?? 0}</Tag>
        <Tag color="red">Rejected: {data?.statistics?.rejected ?? 0}</Tag>
        <Tag color="magenta">Re-Quote: {data?.statistics?.reQuote ?? 0}</Tag>
      </Space>
    </Space>
  );

  const currentProductLabel = filters.productId ? productOptions.find((o) => o.key === filters.productId)?.label ?? "Filter By Product" : "Filter By Product";

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

          <Dropdown
            trigger={["hover"]}
            onOpenChange={(open) => {
              if (open && !productOptions.length) fetchProducts();
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
  
          <Dropdown
            trigger={["hover"]}
            menu={{
              items: STATUS_OPTIONS,
              onClick: (info) => handleStatusChange(info.key),
            }}
          >
            <Button>
              <Filter size={15} className="mr-1" />
              {filters.status ?? "Filter By Status"}
            </Button>
          </Dropdown>
        </div>
  
        <DataTable<Quotation>
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

export default QuotationsTable;