"use client";

import { Button } from "antd";
import { Plus, Pencil } from "lucide-react";
import { useHasHydrated } from "@/features/auth/selectors/auth.selector";
import { usePathname } from "next/navigation";

interface PageHeaderData {
  title: string;
  description?: string;
  actionButton?: {
    label: string;
    icon: React.ReactNode;
  };
}

interface PageHeaderProps {
  onClick?: () => void;
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
    actionButton: {
      label: "Add Representative",
      icon: <Plus size={16} />,
    },
  },
  customers: {
    title: "Customers",
    description: "Manage your customers and their information",
    actionButton: {
      label: "Add Customer",
      icon: <Plus size={16} />,
    },
  },
  quotations: {
    title: "Quotations",
    description: "Manage all quotation requests and pricing proposals",
    actionButton: {
      label: "Create Quotation",
      icon: <Plus size={16} />,
    },
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
  },
  profile: {
    title: "Profile",
    description: "Manage your account settings and personal information",
    actionButton: {
      label: "Edit Profile",
      icon: <Pencil size={16} />,
    },
  }
};

const PageHeader = ({ onClick, className }: PageHeaderProps) => {
  const hasHydrated = useHasHydrated();
  const pathname = usePathname();
  const currentPath = pathname.split("/").pop() || "dashboard";
  const title = pageHeaderData[currentPath]?.title || "Dashboard";
  const description = pageHeaderData[currentPath]?.description || "";
  const actionButton = pageHeaderData[currentPath]?.actionButton || {
    label: "",
    icon: null,
  };
  
  if (!hasHydrated) {
    return null;
  }

  return (
    <div 
      className={`flex-1 flex items-center justify-between border-b border-0.5 border-gray-200 dark:border-white/10 p-5 bg-white dark:bg-transparent ${className}`}
    >
      <div className="flex flex-col gap-1">
        <h1 
          className="text-2xl font-semibold"
        >
          {title}
        </h1>
        <p 
          className="text-xs"
        >
          {description}
        </p>
      </div>
      {actionButton && actionButton.label && (
        <Button
          type="primary"
          icon={actionButton.icon}
          onClick={onClick}
        >
          {actionButton.label}
        </Button>
      )}
    </div>
  );
};

export default PageHeader;