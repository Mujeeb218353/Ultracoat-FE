import Badge from "@/components/Badge";
import { Button, TableProps } from "antd";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Quotation } from "../types/quotations.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (q: Quotation) => void;
  onEdit: (q: Quotation) => void;
  onDelete: (q: Quotation) => void;
};

const getQuotationsColumns = ({ onView, onEdit, onDelete }: ColumnActions): ColumnsType<Quotation> => [
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
    title: "CUSTOMER COMPANY",
    dataIndex: ["customerDetail", "company"],
    key: "customerCompany",
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
    title: "REPRESENTATIVE",
    dataIndex: ["creator", "name"],
    key: "representative",
    width: 180,
    render: (value: string) => (
      <span>{value}</span>
    ),
  },
  {
    title: "PRODUCT TYPE",
    dataIndex: ["productDetail", "name"],
    key: "productType",
    // align: "center",
    render: (value: string) => (
      <Badge 
        kind="productType" 
        value={value ?? "Unknown"} 
      />
    ),
  },
  {
    title: "MATERIAL",
    dataIndex: "material",
    key: "material",
    render: (value: string) => (
      <span>{value ?? "-"}</span>
    ),
  },
  {
    title: "PAPER TYPE",
    dataIndex: "paperType",
    key: "paperType",
    render: (value: string) => (
      <span>{value ?? "-"}</span>
    ),
  },
  {
    title: "SIZE",
    dataIndex: "size",
    key: "size",
    render: (value: string) => (
      <span>{value ?? "-"}</span>
    ),
  },
  {
    title: "DOCUMENT CATEGORY",
    dataIndex: "documentCategory",
    key: "documentCategory",
    render: (value: string) => (
      <span>{value ?? "-"}</span>
    ),
  },
  {
    title: "REQUEST DATE",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{dayjs(value).format("hh:mm A, DD MMM YYYY")}</span>
    ),
  },
  {
    title: "STATUS",
    dataIndex: "status",
    key: "status",
    // align: "center",
    render: (value: string) => (
        // <div className="flex justify-center">
      <Badge 
        kind="status" 
        value={value ?? "Unknown"} 
      />
    //   </div>
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
        <Button
          type="text"
          onClick={() => onEdit(f)}
          icon={<Pencil size={15} className="text-gray-500!" />}
          title="Edit"
        />
        <Button
          type="text"
          onClick={() => onDelete(f)}
          icon={<Trash2 size={15} className="text-red-500!" />}
          title="Delete"
        />
      </div>
    ),
  },
];

export default getQuotationsColumns;