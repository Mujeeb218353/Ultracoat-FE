import { Button, Switch, TableProps } from "antd";
import { Eye, Pencil, Trash2 } from "lucide-react";
import dayjs from "dayjs";
import { Size } from "../types/sizes.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (size: Size) => void;
  onEdit: (size: Size) => void;
  onDelete: (size: Size) => void;
  onToggleStatus: (size: Size, isActive: boolean) => void;
  statusLoadingIds?: string[];
}

const getSizesColumns = ({ onView, onEdit, onDelete, onToggleStatus, statusLoadingIds = [] }: ColumnActions): ColumnsType<Size> => [
  {
    title: "",
    dataIndex: "id",
    key: "id",
    hidden: true,
  },
  {
    title: "",
    dataIndex: "name",
    key: "name",
    width: 30,
    render: () => null,
  },
  {
    title: "NAME",
    dataIndex: "name",
    key: "name",
    width: 220,
    render: (value: string) => <span className="text-xs font-semibold">{value}</span>,
  },
  {
    title: "PRODUCT TYPE",
    dataIndex: ["productDetail", "name"],
    key: "productDetail",
    width: 220,
    render: (value: string) => <span className="text-xs text-gray-500 dark:text-gray-400">{value ?? "-"}</span>,
  },
  {
    title: "CREATED AT",
    dataIndex: "createdAt",
    key: "createdAt",
    width: 180,
    render: (value: string) => <span className="text-xs text-gray-500 dark:text-gray-400">{dayjs(value).format("hh:mm A DD MMM YYYY")}</span>,
  },
  {
    title: "ACTIVE STATUS",
    dataIndex: "isActive",
    key: "isActive",
    width: 80,
    align: "center",
    render: (isActive: boolean, size) => (
      <div className="w-full flex items-center justify-center">
        <Switch
          size="small"
          checkedChildren="Active"
          unCheckedChildren="In Active"
          checked={isActive}
          loading={statusLoadingIds.includes(size.id ?? "")}
          disabled={statusLoadingIds.includes(size.id ?? "")}
          onChange={(checked) => onToggleStatus(size, checked)}
        />
      </div>
    ),
  },
  {
    title: "ACTIONS",
    key: "actions",
    width: 100,
    align: "center",
    render: (_, size) => (
      <div className="flex items-center justify-center gap-1">
        <Button type="text" onClick={() => onView(size)} icon={<Eye size={15} className="text-blue-500!" />} title="View" />
        <Button type="text" onClick={() => onEdit(size)} icon={<Pencil size={15} className="text-gray-500!" />} title="Edit" />
        <Button type="text" onClick={() => onDelete(size)} icon={<Trash2 size={15} className="text-red-500!" />} title="Delete" />
      </div>
    ),
  },
];

export default getSizesColumns;