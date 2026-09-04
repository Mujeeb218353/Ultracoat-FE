"use client";

import PageHeader from "@/components/PageHeader";
import UpdateProfileModal from "@/features/auth/components/UpdateProfileModal";
import UpdatePasswordModal from "@/features/auth/components/UpdatePasswordModal";
import { useOpenModal } from "@/features/modal/selectors/modal.selector";
import { useUser } from "@/features/auth/selectors/auth.selector";


interface ProfileLayoutProps {
  children: React.ReactNode;
};

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  const openModal = useOpenModal();
  const user = useUser();

  return (
    <div className="flex flex-col">
      <PageHeader 
        onClick={() => openModal("UPDATE_PROFILE", user)}
        onSecondaryClick={() => openModal("UPDATE_PASSWORD")}
      />
      <div className="p-5">
        {children}
      </div>
      <UpdateProfileModal />
      <UpdatePasswordModal />
    </div>
  );
};

export default ProfileLayout;