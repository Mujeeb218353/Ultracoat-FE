"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { User } from "lucide-react";
import { Feature } from "../types/features.types";
import UpdateFeatureForm from "./UpdateFeatureForm";

const UpdateFeatureModal = () => {
  const modalData = useModalData<Feature>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const isOpen = activeModal === "UPDATE_FEATURE";

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Update Feature"
      description="Fill in the details below."
      icon={<User size={20} className="text-gray-400" />}
    >
      {isOpen && modalData && <UpdateFeatureForm feature={modalData} />}
    </Modal>
  );
};

export default UpdateFeatureModal;