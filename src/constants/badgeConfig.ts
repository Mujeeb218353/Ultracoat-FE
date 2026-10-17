import { FileText, LucideIcon, Table2, Tag as TagIcon } from "lucide-react";

export const productTypeConfig: Record<string, { style: string; icon: LucideIcon }> = {
  "Label": {
    style: "bg-teal-50! dark:bg-teal-900/30! border-teal-300! dark:border-teal-700! text-teal-700! dark:text-teal-300!",
    icon: TagIcon,
  },
  "Document": {
    style: "bg-blue-50! dark:bg-blue-900/30! border-blue-300! dark:border-blue-700! text-blue-700! dark:text-blue-300!",
    icon: FileText,
  },
  "Sheet": {
    style: "bg-amber-50! dark:bg-amber-900/30! border-amber-300! dark:border-amber-700! text-amber-700! dark:text-amber-300!",
    icon: Table2,
  },
};

export const statusConfig: Record<string, { style: string }> = {
  "PENDING": {
    style: "bg-gray-50! dark:bg-gray-800! border-gray-300! dark:border-gray-600! text-gray-600! dark:text-gray-300!",
  },
  "QUOTED": {
    style: "bg-blue-50! dark:bg-blue-900/30! border-blue-300! dark:border-blue-700! text-blue-700! dark:text-blue-300!",
  },
  "SENT TO CUSTOMER": {
    style: "bg-purple-50! dark:bg-purple-900/30! border-purple-300! dark:border-purple-700! text-purple-700! dark:text-purple-300!",
  },
  "REJECTED": {
    style: "bg-red-50! dark:bg-red-900/30! border-red-300! dark:border-red-700! text-red-700! dark:text-red-300!",
  },
  "APPROVED": {
    style: "bg-green-50! dark:bg-green-900/30! border-green-300! dark:border-green-700! text-green-700! dark:text-green-300!",
  },
  "RE QUOTE": {
    style: "bg-orange-50! dark:bg-orange-900/30! border-orange-300! dark:border-orange-700! text-orange-700! dark:text-orange-300!",
  },
};