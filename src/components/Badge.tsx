import { productTypeConfig, statusConfig } from "@/constants/badgeConfig";
import { Tag } from "antd";

type BadgeKind = "status" | "productType";

interface BadgeProps {
  kind: BadgeKind;
  value: string;
  className?: string;
}

const Badge = ({ kind, value, className = "" }: BadgeProps) => {
  const config = kind === "productType" ? productTypeConfig[value] : statusConfig[value];

  const color = config?.style ?? "bg-gray-300! border-gray-400! text-gray-800! dark:bg-gray-700! dark:border-gray-600! dark:text-gray-200!";
  const Icon = kind === "productType" ? productTypeConfig[value]?.icon : undefined;

  return (
    <div className="flex flex-wrap gap-1">
      <Tag
        className={`text-[9px]! px-2! ${color} ${className} border-none!`}
      >
        {Icon && <Icon size={11} className="mr-1" />}
        {value}
      </Tag>
    </div>
  );
};

export default Badge;