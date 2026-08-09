import { Table, TableProps } from "antd";

type ColumnsType<T> = NonNullable<TableProps<T>["columns"]>;

interface DataTableProps<T extends object> {
  data?: T[];
  columns?: ColumnsType<T>;
  loading?: boolean;
  total?: number;
  skip?: number;
  limit?: number;
  onPageChange?: (skip: number, limit: number) => void;
  rowKey?: string;
  showFooter?: boolean;
  className?: string;
  pagination?: boolean;
  variant?: "default" | "compact";
  thClassName?: string;
  trClassName?: string;
  tdClassName?: string;
  scrollX?: NonNullable<TableProps<T>["scroll"]>["x"];
  size?: NonNullable<TableProps<T>["size"]>;
}

const DataTable = <T extends object>({
  data = [],
  columns = [],
  loading = false,
  total = 0,
  skip = 0,
  limit = 10,
  onPageChange,
  rowKey = "id",
  showFooter = true,
  className,
  pagination = true,
  variant = "default",
  thClassName,
  trClassName,
  tdClassName,
  scrollX,
  size = "small",

}: DataTableProps<T>) => {
  const isCompact = variant === "compact";

  const handlePaginationChange = (page: number, pageSize: number) => {
    onPageChange?.((page - 1) * pageSize, pageSize);
  };

  return (
    <Table<T>
      dataSource={data}
      size={size}
      columns={columns}
      rowKey={rowKey}
      loading={loading}
      scroll={scrollX ? { x: scrollX } : undefined}
      className={`w-full overflow-x-auto rounded-2xl ${className ?? ""}`}
      footer={showFooter ? () => `${skip + data.length < 1 ? 0 : 1}-${total < (skip + data.length)  ? total : skip + data.length} of ${total}` : undefined}
      pagination={pagination ? {
        pageSize: limit,
        total,
        current: Math.floor(skip / limit) + 1,
        showSizeChanger: false,
        onChange: handlePaginationChange,
      } : false }
      components={{
        header: {
          cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => {
            const compactClass = "px-4 py-3 text-xs font-semibold text-gray-500 bg-gray-50 whitespace-nowrap";
            const defaultClass = `font-semibold p-2 text-xs py-4!`;

            return (
              <th
                {...props}
                className={`${isCompact ? compactClass : defaultClass} ${props.className ?? ""} ${thClassName ?? ""}`}
              />
            );
          },
        },
        body: {
          row: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr
              {...props}
              className={`p-0! border-none border-0 hover:bg-gray-50 dark:hover:bg-slate-800 ${trClassName ?? ""}`}
            />
          ),
          cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
            <td
              {...props}
              className={`${isCompact ? "px-6 align-middle whitespace-nowrap" : "p-1! text-xs"} ${props.className ?? ""} ${tdClassName ?? ""}`}
            />
          ),
        },
      }}
    />
  );
};

export default DataTable;