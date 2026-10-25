"use client";

import PageHeader from "@/components/PageHeader";

interface ProfileLayoutProps {
  children: React.ReactNode;
};

const FollowUpsLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader />
      <div className="flex-1">
        {children}
      </div>
    </div>
  );
};

export default FollowUpsLayout;