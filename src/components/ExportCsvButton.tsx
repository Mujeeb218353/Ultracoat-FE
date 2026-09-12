"use client";

import { Button, type ButtonProps } from "antd";
import { Download } from "lucide-react";
import { useState } from "react";
import { buildCsvContent, downloadCsv, CsvColumn } from "@/utils/csv";

type ExportQuery = Record<string, string | number | boolean | null | undefined>;

interface ExportCsvButtonProps<TResponse, TItem> {
  fileName: string;
  fetchData: (query: ExportQuery & { skip: number; limit: number }) => Promise<TResponse>;
  selectRows: (response: TResponse) => TItem[];
  columns: CsvColumn<TItem>[];
  query?: ExportQuery;
  buttonProps?: ButtonProps;
  buttonLabel?: string;
}

const ExportCsvButton = <TResponse, TItem,>({
  fileName,
  fetchData,
  selectRows,
  columns,
  query = {},
  buttonProps,
  buttonLabel = "Export",
}: ExportCsvButtonProps<TResponse, TItem>) => {
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    try {
      setIsExporting(true);
      const response = await fetchData({ skip: 0, limit: 0, ...query });
      const rows = selectRows(response);
      const csv = buildCsvContent(rows, columns);
      downloadCsv(csv, fileName);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Button
      {...buttonProps}
      icon={<Download size={14} />}
      onClick={handleExport}
      loading={isExporting}
      disabled={isExporting || buttonProps?.disabled}
    >
      {buttonLabel}
    </Button>
  );
};

export default ExportCsvButton;