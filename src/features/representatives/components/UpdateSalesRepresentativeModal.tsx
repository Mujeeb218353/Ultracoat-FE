"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { User } from "lucide-react";
import { Representative } from "../types/representatives.types";
import UpdateSalesRepresentativeForm from "./UpdateSalesRepresentativeForm";

const UpdateRepresentativeModal = () => {
  const modalData = useModalData<Representative>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const isOpen = activeModal === "UPDATE_REPRESENTATIVE";

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Update Sales Representative"
      description="Fill in the details below."
      icon={<User size={20} className="text-gray-400" />}
    >
      {isOpen && modalData && (
        <UpdateSalesRepresentativeForm salesRepresentative={modalData} />
      )}
    </Modal>
  );
};

export default UpdateRepresentativeModal;