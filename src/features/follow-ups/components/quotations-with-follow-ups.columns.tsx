import Badge from "@/components/Badge";
import { Button, TableProps } from "antd";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { FollowUpWithQuotation } from "../types/follow-ups.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (f: FollowUpWithQuotation) => void;
};

const getQuotationsWithFollowUpsColumns = ({ onView }: ColumnActions): ColumnsType<FollowUpWithQuotation> => [
  {
    title: "",
    dataIndex: "id",
    key: "hidden-id",
    hidden: true,
  },
  {
    title: "",
    dataIndex: "id",
    key: "empty-spacer",
    width: 30,
    render: () => null,
  },
  {
    title: "CUSTOMER NAME",
    dataIndex: ["customerDetail", "name"],
    key: "customerName",
    render: (value: string) => (
      <span className="font-semibold">{value}</span>
    ),
  },
  {
    title: "CUSTOMER EMAIL",
    dataIndex: ["customerDetail", "email"],
    key: "customerEmail",
    render: (value: string) => (
      <span>{value}</span>
    ),
  },
  {
    title: "CUSTOMER CONTACT",
    dataIndex: ["customerDetail", "phone"],
    key: "customerContact",
    render: (value: string) => (
      <span>{value}</span>
    ),
  },
  {
    title: "CUSTOMER COMPANY",
    dataIndex: ["customerDetail", "company"],
    key: "customerCompany",
    render: (value: string) => (
      <span>{value}</span>
    ),
  },
  {
    title: "CUSTOMER DESIGNATION",
    dataIndex: ["customerDetail", "designation"],
    key: "customerDesignation",
    render: (value: string) => (
      <span>{value}</span>
    ),
  },
  {
    title: "REPRESENTATIVE",
    dataIndex: ["creator", "name"],
    key: "representative",
    width: 180,
    render: (value: string) => (
      <span>{value}</span>
    ),
  },
  {
    title: "Last Visit",
    dataIndex: ["lastFollowUp", "createdAt"],
    key: "createdAt",
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{dayjs(value).format("hh:mm A, DD MMM YYYY")}</span>
    ),
  },
  {
    title: "Next Follow Up",
    dataIndex: ["lastFollowUp", "nextFollowUpDate"],
    key: "nextFollowUpDate",
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{dayjs(value).format("DD MMM YYYY")}</span>
    ),
  },
  {
    title: "Days Since Last Follow Up",
    dataIndex: ["lastFollowUp", "daysSinceLastFollowUp"],
    key: "daysSinceLastFollowUp",
    render: (value: string, record: FollowUpWithQuotation) => (
      <span 
        className={`text-xs ${record?.isOverdue ? "text-red-500 dark:text-red-400" : "text-gray-500 dark:text-gray-400"}`}
      >
        {value ?? "-"}
      </span>
    ),
  },
  {
    title: "ACTIONS",
    key: "actions",
    align: "center",
    render: (_, f) => (
      <div className="flex items-center justify-center gap-1">
        <Button
          type="text"
          onClick={() => onView(f)}
          icon={<Eye size={15} className="text-blue-500!" />}
          title="View"
        />
      </div>
    ),
  },
];

export default getQuotationsWithFollowUpsColumns;