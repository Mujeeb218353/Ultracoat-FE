"use client";

import { Button } from "antd";
import { Plus, Pencil, LockKeyhole } from "lucide-react";
import { useHasHydrated } from "@/features/auth/selectors/auth.selector";
import { usePathname } from "next/navigation";
import PageHeaderSkeleton from "./skeletons/PageHeaderSkeleton";

interface ActionButton {
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "primary" | "default" | "dashed" | "link";
}

interface PageHeaderData {
  title: string;
  description?: string;
  actionButtons?: ActionButton[];
}

interface PageHeaderProps {
  // Primary action button click handler (ya custom key mapping)
  onClick?: () => void;
  // Secondary action handler (e.g., Update Password)
  onSecondaryClick?: () => void;
  className?: string;
}

const pageHeaderData: Record<string, PageHeaderData> = {
  dashboard: {
    title: "Welcome to UCP Dashboard",
    description: "Your comprehensive overview of sales and operations",
  },
  representatives: {
    title: "Representatives",
    description: "Manage your sales representatives and their performance",
    actionButtons: [
      {
        label: "Add Representative",
        icon: <Plus size={16} />,
        type: "primary",
      },
    ],
  },
  customers: {
    title: "Customers",
    description: "Manage your customers and their information",
    actionButtons: [
      {
        label: "Add Customer",
        icon: <Plus size={16} />,
        type: "primary",
      },
    ],
  },
  quotations: {
    title: "Quotations",
    description: "Manage all quotation requests and pricing proposals",
    actionButtons: [
      {
        label: "Create Quotation",
        icon: <Plus size={16} />,
        type: "primary",
      },
    ],
  },
  feedbacks: {
    title: "Feedback",
    description: "Monitor customer feedback and satisfaction by sales representative",
  },
  "finished-jobs": {
    title: "Finished Jobs",
    description: "Archive of completed projects and deliverables",
  },
  "follow-ups": {
    title: "Follow-ups",
    description: "Track and manage follow-up actions for ongoing projects",
  },
  "feature-management": {
    title: "Feature Management",
    description: "Manage coating and finishing features with sub-feature hierarchies",
  },
  "die-size-management": {
    title: "Die Size Management",
    description: "Manage die cutting sizes for labels",
    actionButtons: [
      {
        label: "Add Size",
        icon: <Plus size={16} />,
        type: "primary",
      },
    ],
  },
  profile: {
    title: "Profile",
    description: "Manage your account settings and personal information",
    actionButtons: [
      {
        label: "Edit Profile",
        icon: <Pencil size={16} />,
        type: "default",
      },
      {
        label: "Update Password",
        icon: <LockKeyhole size={16} />,
        type: "primary",
      },
    ],
  },
};

const PageHeader = ({ onClick, onSecondaryClick, className }: PageHeaderProps) => {
  const hasHydrated = useHasHydrated();
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop() || "dashboard";
  
  const currentConfig = pageHeaderData[currentPath];
  const title = currentConfig?.title || "Dashboard";
  const description = currentConfig?.description || "";
  const actionButtons = currentConfig?.actionButtons || [];

  if (!hasHydrated) {
    return <PageHeaderSkeleton isBtnVisible={actionButtons.length > 0} />;
  }
  
  const getClickHandler = (index: number, btnOnClick?: () => void) => {
    if (btnOnClick) return btnOnClick;
    if (index === 0) return onClick;
    if (index === 1) return onSecondaryClick;
    return undefined;
  };

  return (
    <div
      className={`flex-1 flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-0.5 border-gray-200 dark:border-white/10 p-5 bg-white dark:bg-transparent ${className}`}
    >
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-xs text-gray-500 dark:text-gray-400">{description}</p>
      </div>

      {actionButtons.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
          {actionButtons.map((btn, index) => (
            <Button
              key={btn.label}
              type={btn.type || "default"}
              icon={btn.icon}
              onClick={getClickHandler(index, btn.onClick)}
              className="flex items-center"
            >
              {btn.label}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default PageHeader;