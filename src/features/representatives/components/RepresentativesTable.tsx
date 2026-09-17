"use client";

import { useMemo, useState } from "react";
import { Button, Card, Dropdown, Input, Space, Tag } from "antd";
import { Download, Filter, Search } from "lucide-react";
import DataTable from "@/components/Table";
import useDebounce from "@/hooks/use-debounce";
import useRepresentatives from "../hooks/use-representatives";
import getRepresentativesColumns from "./representatives.columns";
import { Representative } from "../types/representatives.types";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";
import useUpdateRepresentativeStatus from "../hooks/use-update-representative-status";
import ExportCsvButton from "@/components/ExportCsvButton";
import representativesApi from "../api/representatives.api";
import { CsvColumn } from "@/utils/csv";
import dayjs from "dayjs";

const STATUS_OPTIONS = [
  { key: "", label: "All" },
  { key: "true", label: "Active" },
  { key: "false", label: "In Active" },
];

const RepresentativesTable = () => {
  const openModal = useOpenModal();
  const { mutate: updateRepresentativeStatus } = useUpdateRepresentativeStatus();

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
  
  const { data, isLoading, isFetching } = useRepresentatives({ 
    skip: pagination.skip, 
    limit: pagination.limit, 
    search, 
    isActive: filters.isActive 
  });

  const columns = useMemo(() => getRepresentativesColumns({ 
    onView: (rep) => openModal("VIEW_REPRESENTATIVE", rep),
    onEdit: (rep) => openModal("UPDATE_REPRESENTATIVE", rep), 
    onEditEmail: (rep) => openModal("UPDATE_REPRESENTATIVE_EMAIL", rep), 
    onDelete: (rep) => openModal("DELETE_REPRESENTATIVE", rep),
    onToggleStatus: (rep, isActive) => {
      if (!rep.id) return;

      setStatusLoadingId(rep.id);
      updateRepresentativeStatus(
        { id: rep.id, isActive },
        {
          onSettled: () => {
            setStatusLoadingId(null);
          },
        },
      );
    },
    statusLoadingIds: statusLoadingId ? [statusLoadingId] : [],
  }), [openModal, statusLoadingId, updateRepresentativeStatus]);
  
  const total = data?.statistics.total ?? 0;
  const active = data?.statistics.active ?? 0;
  const inactive = data?.statistics.inactive ?? 0;


  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value }));
    setPagination(prev => ({ ...prev, skip: 0 }));
  };

  const handleStatusChange = (key: string) => {
    if (key === "") {
      setFilters(prev => ({ ...prev, isActive: null }));
    } else {
      setFilters(prev => ({ ...prev, isActive: key === "true" }));
    }
    setPagination(prev => ({ ...prev, skip: 0 }));
  };

  const exportColumns: CsvColumn<Representative>[] = [
    { header: "Name", value: (rep) => rep.name },
    { header: "Email", value: (rep) => rep.email },
    { header: "Phone", value: (rep) => rep.phone },
    { header: "Location", value: (rep) => rep.location },
    { header: "Active", value: (rep) => (rep.isActive ? "Active" : "In Active") },
    { header: "Created At", value: (rep) => dayjs(rep.createdAt).format("HH:mm A, DD MMM YYYY") },
  ];

  const currentStatusLabel = filters.isActive === null ? "Filter" : STATUS_OPTIONS.find((o) => o.key === String(filters.isActive))?.label ?? "Filter";

  const CardTitle = (
    <Space size="small" className="w-full flex justify-center sm:justify-between items-center flex-col sm:flex-row gap-2 sm:gap-4 my-4 sm:my-0">
      <span className="font-semibold text-lg">Representatives</span>
      <Space size="small">
        <Tag color="blue">Total: {total}</Tag>
        <Tag color="green">Active: {active}</Tag>
        <Tag color="red">In Active: {inactive}</Tag>
      </Space>
    </Space>
  );

  return (
    <Card
      title={CardTitle}
    >
      <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3 sm:p-4">
        <Input
          allowClear
          value={filters.search}
          onChange={(e) => handleSearch(e.target.value)}
          prefix={<Search size={15} className="text-gray-400 mr-1" />}
          placeholder="Search by name, email, or phone..."
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

          <ExportCsvButton
            fileName={`Sales_Representatives_${search ? search.concat("_") : ""}${filters.isActive ? "Active_" : !filters.isActive ? "InActive_" : ""}${dayjs().format("YYYY-MM-DD_HH-mm-ss")}.csv`}
            fetchData={(query) => representativesApi.getRepresentatives(query)}
            selectRows={(response) => response.salesRepresentatives}
            columns={exportColumns}
            buttonProps={{ icon: <Download size={14} /> }}
            buttonLabel="Export"
            query={{
              search,
              isActive: filters.isActive,
            }}
          />
      </div>

      <DataTable<Representative>
        data={data?.salesRepresentatives ?? []}
        columns={columns}
        loading={isLoading || isFetching}
        total={data?.total}
        skip={pagination.skip}
        limit={pagination.limit}
        onPageChange={(newSkip, newLimit) => {
          setPagination(prev => ({ ...prev, skip: newSkip, limit: newLimit }));
        }}
        rowKey="id"
      />
    </Card>
  );
};

export default RepresentativesTable;