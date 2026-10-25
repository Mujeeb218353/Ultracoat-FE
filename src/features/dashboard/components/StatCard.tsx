"use client";

import { Card } from "antd";
import { TrendingDown, TrendingUp } from "lucide-react";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  change?: number | null;
  changeSuffix?: string;
  changeLabel?: string;
  footer?: React.ReactNode;
}

const StatCard = ({ icon, value, label, change, changeSuffix = "", changeLabel = "from last month", footer }: StatCardProps) => {
  return (
    <Card className=" shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <div className="flex items-center gap-3">
        <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#001259] text-white">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-xl font-bold leading-tight text-[#001259] dark:text-white">{value}</div>
          <div className="truncate text-xs text-gray-500 dark:text-gray-400">{label}</div>
        </div>
      </div>
      {change !== undefined && change !== null && (
        <div className={`mt-1.5 flex items-center gap-1 text-[11px] font-semibold ${change >= 0 ? "text-green-700" : "text-red-600"}`}>
          {change >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
          {change >= 0 ? "+" : "-"}{Math.abs(change)}{changeSuffix} {changeLabel}
        </div>
      )}
      {footer && <div className="mt-1.5 text-[11px] font-semibold text-gray-500 dark:text-gray-400">{footer}</div>}
    </Card>
  );
};

export default StatCard;
