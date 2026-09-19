"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import { Customer } from "../types/customers.types";
import useDeleteCustomer from "../hooks/use-delete-customer";

const DeleteCustomerModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const modalData = useModalData<Customer>();
  const { mutate: deleteCustomer, isPending } = useDeleteCustomer();

  const isOpen = activeModal === "DELETE_CUSTOMER";

  if (!isOpen || !modalData?.id) return null;

  const handleDelete = () => {
    deleteCustomer(modalData.id!, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Delete Customer"
      description="This action cannot be undone."
      icon={<Trash2 size={20} className="text-gray-400" />}
      footer={(
        <div className="w-full flex flex-col-reverse sm:flex-row items-center gap-4 justify-center sm:justify-end pt-2">
          <Button
            disabled={isPending}
            onClick={closeModal}
            className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!"
          >
            Cancel
          </Button>
          <Button danger type="primary" loading={isPending} onClick={handleDelete}>
            Delete Customer
          </Button>
        </div>
      )}
    >
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Are you sure you want to delete <span className="font-semibold">{modalData.name}</span>?
        </p>
        <p>The customer record will be removed permanently.</p>
      </div>
    </Modal>
  );
};

export default DeleteCustomerModal;