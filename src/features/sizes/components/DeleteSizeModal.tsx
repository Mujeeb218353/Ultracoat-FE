"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Button } from "antd";
import { Trash2 } from "lucide-react";
import { Size } from "../types/sizes.types";
import useDeleteSize from "../hooks/use-delete-size";

const DeleteSizeModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const modalData = useModalData<Size>();
  const { mutate: deleteSize, isPending } = useDeleteSize();

  const isOpen = activeModal === "DELETE_SIZE";

  if (!isOpen || !modalData?.id) return null;

  const handleDelete = () => {
    deleteSize(modalData.id!, {
      onSuccess: () => closeModal(),
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Delete Die Size"
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
            Delete Size
          </Button>
        </div>
      )}
    >
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>
          Are you sure you want to delete <span className="font-semibold">{modalData.name}</span>?
        </p>
        <p>The size record will be removed permanently.</p>
      </div>
    </Modal>
  );
};

export default DeleteSizeModal;