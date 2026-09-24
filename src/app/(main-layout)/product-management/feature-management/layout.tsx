"use client";

import PageHeader from "@/components/PageHeader";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";

interface ProfileLayoutProps {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const openModal = useOpenModal();

  return (
    <div className="flex-1 flex flex-col">
      <PageHeader onClick={() => openModal("CREATE_FEATURE")} />
      <div className="flex-1 p-5">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;