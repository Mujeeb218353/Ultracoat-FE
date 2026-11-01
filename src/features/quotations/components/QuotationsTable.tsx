"use client";

import DataTable from "@/components/Table";
import PaginatedDropdown from "@/components/PaginatedDropdown";
import { useProductsOptions, getProductOption } from "@/features/products/hooks/use-products-list";
import useRepresentativesOptions, { getRepresentativeOption } from "@/features/representatives/hooks/use-representatives-list";
import useCustomersOptions, { getCustomerOption } from "@/features/customers/hooks/use-customer-list";
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
  const [filters, setFilters] = useState<Filters>({
    search: "",
    status: null,
    productId: null,
    customerId: null,
    salesRepresentativeId: null,
  });
  const [pagination, setPagination] = useState({ skip: 0, limit: 10 });

  const search = useDebounce(filters.search);
  
  const { data, isLoading, isFetching } = useQuotations({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
    status: filters.status,
    productId: filters.productId ?? undefined,
    customerId: filters.customerId ?? undefined,
    salesRepresentativeId: filters.salesRepresentativeId ?? undefined,
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

  const handleCustomerChange = (key: string) => {
    setFilters((prev) => ({ ...prev, customerId: key === "" ? null : key }));
    resetPage();
  };

  const handleSalesRepresentativeChange = (key: string) => {
    setFilters((prev) => ({ ...prev, salesRepresentativeId: key === "" ? null : key }));
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

          <PaginatedDropdown
            useOptions={useProductsOptions}
            getOption={getProductOption}
            value={filters.productId}
            onChange={handleProductChange}
            placeholder="Filter By Product"
            icon={<Filter size={14} />}
            searchPlaceholder="Search products..."
          />

          <PaginatedDropdown
            useOptions={useCustomersOptions}
            getOption={getCustomerOption}
            value={filters.customerId}
            onChange={handleCustomerChange}
            placeholder="Filter By Customer"
            icon={<Filter size={14} />}
            searchPlaceholder="Search customers..."
          />

          <PaginatedDropdown
            useOptions={useRepresentativesOptions}
            getOption={getRepresentativeOption}
            value={filters.salesRepresentativeId}
            onChange={handleSalesRepresentativeChange}
            placeholder="Filter By Sales Representative"
            icon={<Filter size={14} />}
            searchPlaceholder="Search representatives..."
          />

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