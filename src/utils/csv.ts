export type CsvCell = string | number | boolean | null | undefined | Date;

export interface CsvColumn<T> {
  header: string;
  value: (row: T) => CsvCell;
}

const escapeCsvCell = (value: CsvCell) => {
  if (value === null || value === undefined) return "";

  const normalized = value instanceof Date ? value.toISOString() : String(value);
  return `"${normalized.replace(/"/g, '""')}"`;
};

export const buildCsvContent = <T,>(rows: T[], columns: CsvColumn<T>[]) => {
  const headerLine = columns.map((column) => escapeCsvCell(column.header)).join(",");
  const dataLines = rows.map((row) =>
    columns.map((column) => escapeCsvCell(column.value(row))).join(","),
  );

  return [headerLine, ...dataLines].join("\r\n");
};

export const downloadCsv = (content: string, fileName: string) => {
  const blob = new Blob(["\uFEFF", content], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName.endsWith(".csv") ? fileName : `${fileName}.csv`;
  link.style.display = "none";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};