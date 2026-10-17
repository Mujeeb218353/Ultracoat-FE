"use client";

import PageHeader from "@/components/PageHeader";
import { useRouter } from "next/navigation";

interface ProfileLayoutProps {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const router = useRouter();
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader 
        onClick={() => {
          router.push("/quotations/new");
        }}
      />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;