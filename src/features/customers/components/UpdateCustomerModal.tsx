"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { User } from "lucide-react";
import { Customer } from "../types/customers.types";
import UpdateCustomerForm from "./UpdateCustomerForm";

const UpdateCustomerModal = () => {
  const modalData = useModalData<Customer>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const isOpen = activeModal === "UPDATE_CUSTOMER";

  if (!isOpen) return null;

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Update Customer"
      description="Fill in the details below."
      icon={<User size={20} className="text-gray-400" />}
    >
      {isOpen && modalData && <UpdateCustomerForm customer={modalData} />}
    </Modal>
  );
};

export default UpdateCustomerModal;