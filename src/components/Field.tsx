import { ReactNode } from "react";

interface FieldProps {
  label: string;
  value?: string | number | null;
  className?: string;
  children?: ReactNode;
}

const Field = ({ label, value, className, children }: FieldProps) => (
  <div className="flex flex-col gap-0.5">
    <span className="text-gray-400">{label}</span>
    {children ?? (
      <span className={`font-semibold text-gray-800 dark:text-gray-100 ${className || ""}`}>
        {value === null || value === undefined || value === "" ? "—" : value}
      </span>
    )}
  </div>
);

export default Field;
