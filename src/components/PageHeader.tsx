"use client";

import { Button } from "antd";
import { Plus } from "lucide-react";
import { useHasHydrated } from "@/features/auth/selectors/auth.selector";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const PageHeader = ({ title, subtitle, actionLabel, onAction }: PageHeaderProps) => {
  const hasHydrated = useHasHydrated();
  
  
  if (!hasHydrated) {
    return null;
  }
  return (
    <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
      <div>
        <h1 className="text-2xl font-bold text-[#0A1F44]">{title}</h1>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>
      {actionLabel && onAction && (
        <Button
          type="primary"
          icon={<Plus size={16} />}
          onClick={onAction}
          className="bg-[#0A1F44]! hover:bg-[#0A1F44]/90! h-10! px-4!"
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;