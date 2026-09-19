import { Button, TableProps } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Customer } from "../types/customers.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (customer: Customer) => void;
  onEdit: (customer: Customer) => void;
  onDelete: (customer: Customer) => void;
}

const getCustomersColumns = ({
  onView,
  onEdit,
  onDelete,
}: ColumnActions): ColumnsType<Customer> => [
  {
    title: "",
    dataIndex: "id",
    key: "id",
    hidden: true,
  },
  {
    title: "",
    dataIndex: "location",
    key: "location",
    width: 30,
    render: () => null,
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    width: 180,
    render: (value: string) => <span className="text-xs font-semibold">{value}</span>,
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    key: "email",
    width: 240,
    render: (value: string) => <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>,
  },
  {
    title: "PHONE",
    dataIndex: "phone",
    key: "phone",
    width: 180,
    render: (value: string) => <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>,
  },
  {
    title: "Company",
    dataIndex: "company",
    key: "company",
    width: 180,
    render: (value: string) => <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>,
  },
  {
    title: "Designation",
    dataIndex: "designation",
    key: "designation",
    width: 180,
    render: (value: string) => <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>,
  },
  {
    title: "CREATED AT",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{dayjs(value).format("hh:mm A DD MMM YYYY")}</span>
    ),
  },
  {
    title: "ACTIONS",
    key: "actions",
    width: 100,
    align: "center",
    render: (_, customer) => (
      <div className="flex items-center justify-center gap-1">
        <Button type="text" onClick={() => onView(customer)} icon={<Eye size={15} className="text-blue-500!" />} title="View" />
        <Button type="text" onClick={() => onEdit(customer)} icon={<Pencil size={15} className="text-gray-500!" />} title="Edit" />
        <Button type="text" onClick={() => onDelete(customer)} icon={<Trash2 size={15} className="text-red-500!" />} title="Delete" />
      </div>
    ),
  },
];

export default getCustomersColumns;