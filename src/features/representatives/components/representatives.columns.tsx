import { Button, Switch, TableProps } from "antd";
import { Eye, MailPen, Pencil, Trash2 } from "lucide-react";
import { Representative } from "../types/representatives.types";
import dayjs from "dayjs";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (rep: Representative) => void;
  onEdit: (rep: Representative) => void;
  onEditEmail: (rep: Representative) => void;
  onDelete: (rep: Representative) => void;
  onToggleStatus: (rep: Representative, isActive: boolean) => void;
  statusLoadingIds?: string[];
};

const getRepresentativesColumns = ({ onView, onEdit, onEditEmail, onDelete, onToggleStatus, statusLoadingIds = [] }: ColumnActions): ColumnsType<Representative> => [
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
    render: (value: string) => (
      <span className="text-xs font-semibold">{value}</span>
    ),
  },
  {
    title: "EMAIL",
    dataIndex: "email",
    key: "email",
    width: 240,
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
    ),
  },
  {
    title: "PHONE",
    dataIndex: "phone",
    key: "phone",
    width: 180,
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
    ),
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
    title: "ACTIVE STATUS",
    dataIndex: "isActive",
    key: "isActive",
    width: 80,
    align: "center",
    render: (isActive: boolean, rep) => (
      <div className="w-full flex items-center justify-center">
        <Switch
          size="small"
          checkedChildren="Active"
          unCheckedChildren="In Active"
          checked={isActive}
          loading={statusLoadingIds.includes(rep.id ?? "")}
          disabled={statusLoadingIds.includes(rep.id ?? "")}
          onChange={(checked) => onToggleStatus(rep, checked)}
        />
      </div>
    ),
  },
  {
    title: "ACTIONS",
    key: "actions",
    width: 100,
    align: "center",
    render: (_, rep) => (
      <div className="flex items-center justify-center gap-1">
        <Button
          type="text"
          onClick={() => onView(rep)}
          icon={<Eye size={15} className="text-blue-500!" />}
          title="View"
        />
        <Button
          type="text"
          onClick={() => onEditEmail(rep)}
          icon={<MailPen size={15} className="text-amber-500!" />}
          title="Edit Email"
        />
        <Button
          type="text"
          onClick={() => onEdit(rep)}
          icon={<Pencil size={15} className="text-gray-500!" />}
          title="Edit"
        />
        <Button
          type="text"
          onClick={() => onDelete(rep)}
          icon={<Trash2 size={15} className="text-red-500!" />}
          title="Delete"
        />
      </div>
    ),
  },
];

export default getRepresentativesColumns;