"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Ruler } from "lucide-react";
import { Size } from "../types/sizes.types";
import UpdateSizeForm from "./UpdateSizeForm";

const UpdateSizeModal = () => {
  const modalData = useModalData<Size>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const isOpen = activeModal === "UPDATE_SIZE";

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Update Die Size"
      description="Fill in the details below."
      icon={<Ruler size={20} className="text-gray-400" />}
    >
      {isOpen && modalData && <UpdateSizeForm size={modalData} />}
    </Modal>
  );
};

export default UpdateSizeModal;