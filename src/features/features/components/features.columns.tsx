import { Button, Switch, TableProps, Tag } from "antd";
import dayjs from "dayjs";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Feature } from "../types/features.types";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface ColumnActions {
  onView: (f: Feature) => void;
  onEdit: (f: Feature) => void;
  onDelete: (f: Feature) => void;
  onToggleStatus: (f: Feature, isActive: boolean) => void;
  statusLoadingIds?: string[];
};

const getFeaturesColumns = ({ onView, onEdit, onDelete, onToggleStatus, statusLoadingIds = [] }: ColumnActions): ColumnsType<Feature> => [
  {
    title: "",
    dataIndex: "id",
    key: "id",
    hidden: true,
  },
  {
    title: "",
    dataIndex: "id",
    key: "id",
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
    title: "Product Type",
    dataIndex: ["productDetail", "name"],
    key: "productDetail",
    width: 240,
    render: (value: string) => (
      <span className="text-xs text-gray-500 dark:text-gray-400">{value}</span>
    ),
  },
  {
    title: "OPTION GROUPS",
    dataIndex: "optionGroups",
    key: "optionGroupsSummary",
    width: 250,
    render: (optionGroups: Feature["optionGroups"]) => (
      <div className="flex flex-wrap gap-1">
        {(optionGroups ?? []).map((g) => (
          <Tag key={g.id} color="green" className="text-[10px] font-medium">
            {g.label}
          </Tag>
        ))}
        {(!optionGroups || optionGroups.length === 0) && <span className="text-xs text-gray-400">—</span>}
      </div>
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
    render: (isActive: boolean, f) => (
      <div className="w-full flex items-center justify-center">
        <Switch
          size="small"
          checkedChildren="Active"
          unCheckedChildren="In Active"
          checked={isActive}
          loading={statusLoadingIds.includes(f.id ?? "")}
          disabled={statusLoadingIds.includes(f.id ?? "")}
          onChange={(checked) => onToggleStatus(f, checked)}
        />
      </div>
    ),
  },
  {
    title: "ACTIONS",
    key: "actions",
    width: 100,
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

export default getFeaturesColumns;