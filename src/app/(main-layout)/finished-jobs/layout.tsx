"use client";

import PageHeader from "@/components/PageHeader";
import { usePathname } from "next/navigation";

interface FinishedJobsLayoutProps {
  children: React.ReactNode;
}

const FinishedJobsLayout = ({ children }: FinishedJobsLayoutProps) => {
  const pathname = usePathname();
  const isListPage = pathname === "/finished-jobs";

  return (
    <div className="flex-1 flex flex-col">
      {isListPage && <PageHeader />}
      <div className="flex-1 p-5">{children}</div>
    </div>
  );
};

export default FinishedJobsLayout;