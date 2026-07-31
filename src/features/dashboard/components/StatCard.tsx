"use client";

import { Card } from "antd";

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
}

const StatCard = ({ icon, value, label }: StatCardProps) => {
  return (
    <Card className="shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <div className="mb-4 flex size-10 items-center justify-center rounded-lg bg-[#001259] text-white">
        {icon}
      </div>
      <div className="text-3xl font-bold text-[#001259] dark:text-white">{value}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{label}</div>
    </Card>
  );
};

export default StatCard;