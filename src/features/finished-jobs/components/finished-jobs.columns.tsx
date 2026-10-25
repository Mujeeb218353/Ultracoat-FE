import Badge from "@/components/Badge";
import { Button, TableProps } from "antd";
import dayjs from "dayjs";
import { Eye } from "lucide-react";
import { FinishedJobListItem } from "../types/finished-jobs.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (job: FinishedJobListItem) => void;
}

const getFinishedJobsColumns = ({ onView }: ColumnActions): ColumnsType<FinishedJobListItem> => [
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
    render: (value?: string) => <Badge kind="productType" value={value ?? "Unknown"} />,
  },
  {
    title: "QUANTITY",
    dataIndex: ["quotation", "quantity"],
    key: "quantity",
    render: (value?: number | null) => <span>{value?.toLocaleString() ?? "-"}</span>,
  },
  {
    title: "MATERIAL",
    dataIndex: ["quotation", "material"],
    key: "material",
    render: (value?: string | null) => <span>{value ?? "-"}</span>,
  },
  {
    title: "PAPER TYPE",
    dataIndex: ["quotation", "paperType"],
    key: "paperType",
    render: (value?: string | null) => <span>{value ?? "-"}</span>,
  },
  {
    title: "SIZE",
    dataIndex: ["quotation", "size"],
    key: "size",
    render: (value?: string | null) => <span>{value ?? "-"}</span>,
  },
  {
    title: "DOCUMENT CATEGORY",
    dataIndex: ["quotation", "documentCategory"],
    key: "documentCategory",
    render: (value?: string | null) => <span>{value ?? "-"}</span>,
  },
  {
    title: "REQUEST DATE",
    dataIndex: ["quotation", "createdAt"],
    key: "createdAt",
    render: (value?: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {value ? dayjs(value).format("hh:mm A, DD MMM YYYY") : "-"}
      </span>
    ),
  },
  {
    title: "RATING",
    dataIndex: "avgRating",
    key: "avgRating",
    render: (value?: string) => <span>{value == null ? "-" : `${Number(value).toFixed(1)} / 5`}</span>,
  },
  {
    title: "UPDATED",
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">
        {value ? dayjs(value).format("hh:mm A, DD MMM YYYY") : "-"}
      </span>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    render: (value?: string) => <Badge kind="status" value={value ?? "Unknown"} />,
  },
  {
    title: "ACTIONS",
    key: "actions",
    align: "center",
    render: (_, job) => (
      <Button
        type="text"
        onClick={() => onView(job)}
        icon={<Eye size={15} className="text-blue-500!" />}
        title="View"
      />
    ),
  },
];

export default getFinishedJobsColumns;
