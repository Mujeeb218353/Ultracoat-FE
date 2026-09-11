"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import { Representative } from "../types/representatives.types";
import useDeleteRepresentative from "../hooks/use-delete-representative";

const DeleteRepresentativeModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const modalData = useModalData<Representative>();
  const { mutate: deleteRepresentative, isPending } = useDeleteRepresentative();

  const isOpen = activeModal === "DELETE_REPRESENTATIVE";

  if (!isOpen || !modalData?.id) return null;

  const handleDelete = () => {
    deleteRepresentative(modalData.id!, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Delete Representative"
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
            Delete Representative
          </Button>
        </div>
      )}
    >
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Are you sure you want to delete <span className="font-semibold">{modalData.name}</span>?
        </p>
        <p>The representative record will be removed permanently.</p>
      </div>
    </Modal>
  );
};

export default DeleteRepresentativeModal;