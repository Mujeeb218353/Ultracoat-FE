import Badge from "@/components/Badge";
import { Button, TableProps } from "antd";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { Feedback } from "../types/feedback.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (feedback: Feedback) => void;
}

const getFeedbacksColumns = ({ onView }: ColumnActions): ColumnsType<Feedback> => [
  {
    title: "",
    dataIndex: "id",
    key: "empty-spacer",
    width: 30,
    render: () => null,
  },
  {
    title: "CUSTOMER NAME",
    dataIndex: ["quotation", "customerDetail", "name"],
    key: "customerName",
    render: (value?: string) => <span className="font-semibold">{value ?? "-"}</span>,
  },
  {
    title: "CUSTOMER COMPANY",
    dataIndex: ["quotation", "customerDetail", "company"],
    key: "customerCompany",
    render: (value?: string) => <span>{value ?? "-"}</span>,
  },
  {
    title: "CUSTOMER CONTACT",
    dataIndex: ["quotation", "customerDetail", "phone"],
    key: "customerContact",
    render: (value?: string) => <span>{value ?? "-"}</span>,
  },
  {
    title: "PRODUCT TYPE",
    dataIndex: ["quotation", "productDetail", "name"],
    key: "productType",
    render: (value?: string) => (
      <Badge kind="productType" value={value ?? "Unknown"} />
    ),
  },
  {
    title: "QUOTATION STATUS",
    dataIndex: ["quotation", "status"],
    key: "quotationStatus",
    render: (value?: string) => value ? <Badge kind="status" value={value} /> : <span>-</span>,
  },
  {
    title: "MATERIAL",
    dataIndex: ["quotation", "material"],
    key: "material",
    render: (value?: string | null) => <span>{value ?? "-"}</span>,
  },
  {
    title: "QUANTITY",
    dataIndex: ["quotation", "quantity"],
    key: "quantity",
    render: (value?: number) => <span>{value?.toLocaleString() ?? "-"}</span>,
  },
  {
    title: "AVERAGE RATING",
    dataIndex: "avgRating",
    key: "avgRating",
    render: (value?: string) => <span>{value == null ? "-" : `${Number(value).toFixed(1)} / 5`}</span>,
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (value?: string) => (
      <span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${value === "SUBMITTED" ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300" : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"}`}>
        {value ?? "Unknown"}
      </span>
    ),
  },
  {
    title: "CREATED",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value?: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {value ? dayjs(value).format("hh:mm A, DD MMM YYYY") : "-"}
      </span>
    ),
  },
  {
    title: "ACTIONS",
    key: "actions",
    align: "center",
    render: (_, feedback) => (
      <Button
        type="text"
        onClick={() => onView(feedback)}
        icon={<Eye size={15} className="text-blue-500!" />}
        title="View feedback"
      />
    ),
  },
];

export default getFeedbacksColumns;
