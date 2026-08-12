"use client";

import PageHeader from "@/components/PageHeader";
import useDashboard from "@/features/dashboard/hooks/use-dashboard";
import Loading from "./loading";

interface DashboardLayoutProps {
  children: React.ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const { isLoading } = useDashboard();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;