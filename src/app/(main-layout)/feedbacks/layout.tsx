"use client";

import PageHeader from "@/components/PageHeader";
import { usePathname } from "next/navigation";

interface FeedbacksLayoutProps {
  children: React.ReactNode;
};

const FeedbacksLayout = ({ children }: FeedbacksLayoutProps) => {
  const pathname = usePathname();
  const isFeedbackListPage = pathname === "/feedbacks";

  return (
    <div className="flex-1 flex flex-col">
      {isFeedbackListPage && <PageHeader />}
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default FeedbacksLayout;