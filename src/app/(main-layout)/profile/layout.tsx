"use client";

import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import EditProfileModal from "@/features/auth/components/EditProfileModal";

interface ProfileLayoutProps {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="flex-1 flex flex-col">
      <PageHeader 
        onClick={() => setIsModalOpen(true)}
      />
      <div className="flex-1 p-5">
        {children}
      </div>
      <EditProfileModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default ProfileLayout;