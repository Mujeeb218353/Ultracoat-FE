"use client";

import { useActiveModal, useCloseModal } from "@/features/modal/selectors/modal.selector";
import Modal from "@/components/Modal";
import UpdateProfileForm from "./UpdateProfileForm";
import { User } from "lucide-react";

const UpdateProfileModal = () => {
  const activeModal = useActiveModal();
  const onClose = useCloseModal();
  const open = activeModal === "UPDATE_PROFILE";

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Edit Profile"
      description="Update your profile information"
      icon={<User size={20} className="text-gray-400" />}
    >
      <UpdateProfileForm />
    </Modal>
  );
};

export default UpdateProfileModal;