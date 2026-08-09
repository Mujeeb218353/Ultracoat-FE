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

}: DataTableProps<T>) => {
  const isCompact = variant === "compact";

  const handlePaginationChange = (page: number, pageSize: number) => {
    onPageChange?.((page - 1) * pageSize, pageSize);
  };

  return (
    <Table<T>
      dataSource={data}
      size={isCompact ? "large" : "small"}
      columns={columns}
      rowKey={rowKey}
      loading={loading}
      scroll={scrollX ? { x: scrollX } : undefined}
      className={`w-full! overflow-x-auto! ${className ?? ""}`}
      footer={showFooter ? () => `Total: ${total}` : undefined}
      pagination={pagination ? {
        pageSize: limit,
        total,
        current: Math.floor(skip / limit) + 1,
        showSizeChanger: false,
        onChange: handlePaginationChange,
      } : false}
      components={{
        header: {
          cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => {
            const compactClass = "px-4! py-3! text-xs! font-semibold! text-gray-500! bg-gray-50! whitespace-nowrap!";
            const defaultClass = `font-semibold! p-2! text-xs! py-3! text-left! pl-10!`;

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
              className={`hover:bg-gray-50! dark:hover:bg-gray-800! transition-colors! duration-200! ${trClassName ?? ""}`}
            />
          ),
          cell: (props: React.TdHTMLAttributes<HTMLTableCellElement>) => (
            <td
              {...props}
              className={`${isCompact ? "px-6! align-middle! whitespace-nowrap!" : "p-1! text-xs! pl-10! py-3!"} ${props.className ?? ""} ${tdClassName ?? ""}`}
            />
          ),
        },
      }}
    />
  );
};

export default DataTable;