"use client";

import { useMemo, useState } from "react";
import { Card, Input, Space, Tag } from "antd";
import { Download,  Search } from "lucide-react";
import DataTable from "@/components/Table";
import useDebounce from "@/hooks/use-debounce";
import useCustomers from "../hooks/use-customers";
import getCustomersColumns from "./customers.columns";
import { Customer } from "../types/customers.types";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";
import ExportCsvButton from "@/components/ExportCsvButton";
import customersApi from "../api/customers.api";
import { CsvColumn } from "@/utils/csv";
import dayjs from "dayjs";

const CustomersTable = () => {
  const openModal = useOpenModal();

  const [filters, setFilters] = useState({
    search: "",
  });
  const [pagination, setPagination] = useState({
    skip: 0,
    limit: 10,
  });

  const search = useDebounce(filters.search);

  const { data, isLoading, isFetching } = useCustomers({
    skip: pagination.skip,
    limit: pagination.limit,
    search,
  });

  const columns = useMemo(() => getCustomersColumns({
    onView: (customer) => openModal("VIEW_CUSTOMER", customer),
    onEdit: (customer) => openModal("UPDATE_CUSTOMER", customer),
    onDelete: (customer) => openModal("DELETE_CUSTOMER", customer),
  }), [openModal]);

  const total = data?.statistics.total ?? 0;

  const handleSearch = (value: string) => {
    setFilters((prev) => ({ ...prev, search: value }));
    setPagination((prev) => ({ ...prev, skip: 0 }));
  };

  const exportColumns: CsvColumn<Customer>[] = [
    { header: "Name", value: (customer) => customer.name },
    { header: "Email", value: (customer) => customer.email },
    { header: "Phone", value: (customer) => customer.phone },
    { header: "Location", value: (customer) => customer.location },
    { header: "Active", value: (customer) => (customer.isActive ? "Active" : "In Active") },
    { header: "Verified", value: (customer) => (customer.isVerified ? "Verified" : "Not Verified") },
    { header: "Created At", value: (customer) => customer.createdAt },
  ];

  const CardTitle = (
    <Space size="small" className="w-full flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-0">
      <span className="font-semibold text-lg">Customers</span>
      <Space size="small">
        <Tag color="blue">Total: {total}</Tag>
      </Space>
    </Space>
  );

  return (
    <Card title={CardTitle}>
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 sm:p-4">
        <Input
          allowClear
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<Search size={15} className="text-gray-400 mr-1" />}
          placeholder="Search by name, email, or phone..."
          className="flex-1 min-w-52"
        />

        <ExportCsvButton
          fileName={`Customers_${search ? search.concat("_") : ""}${dayjs().format("HH-mm-ss-A_DD_MMM_YYYY")}.csv`}
          fetchData={(query) => customersApi.getCustomers(query)}
          selectRows={(response) => response.customers}
          columns={exportColumns}
          buttonProps={{ icon: <Download size={14} /> }}
          buttonLabel="Export"
          query={{ search, isActive: filters.isActive }}
        />
      </div>

      <DataTable<Customer>
        data={data?.customers ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        total={data?.total}
        skip={pagination.skip}
        limit={pagination.limit}
        onPageChange={(newSkip, newLimit) => {
          setPagination((prev) => ({ ...prev, skip: newSkip, limit: newLimit }));
        }}
        rowKey="id"
      />
    </Card>
  );
};

export default CustomersTable;