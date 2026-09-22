"use client";

import Modal from "@/components/Modal";
import DataDescriptions from "@/components/Description";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Ruler } from "lucide-react";
import dayjs from "dayjs";
import useSizeById from "../hooks/use-size-by-id";
import { Size } from "../types/sizes.types";

const ViewSizeModal = () => {
  const size = useModalData<Size>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();

  const isOpen = activeModal === "VIEW_SIZE";
  const { data, isLoading } = useSizeById(isOpen ? size?.id : undefined);

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Die Size Details"
      description="Size information."
      icon={<Ruler size={20} className="text-gray-400" />}
    >
      <DataDescriptions
        loading={isLoading}
        data={data}
        title="Die Size Details"
        fields={[
          { label: "Name", span: 2, render: (item) => item.name },
          { label: "Product Type", render: (item) => item.productDetail?.name ?? "-" },
          { label: "Active", render: (item) => (item.isActive ? "Active" : "In Active") },
          { label: "Created At", render: (item) => dayjs(item.createdAt).format("HH:mm A, DD MMM YYYY") },
          { label: "Updated At", render: (item) => dayjs(item.updatedAt).format("HH:mm A, DD MMM YYYY") },
          {
            label: "Created By",
            span: 2,
            render: (item) => (
              <div className="flex flex-col">
                <span className="font-medium">Name: {item?.creator?.name}</span>
                <span className="text-xs text-gray-500">Email: {item?.creator?.email}</span>
                <span className="text-xs text-gray-500">Phone: {item?.creator?.phone}</span>
                <span className="text-xs text-gray-500">Role: {item?.creator?.role}</span>
                <span className="text-xs text-gray-500">Location: {item?.creator?.location}</span>
              </div>
            ),
          },
          {
            label: "Updated By",
            span: 2,
            render: (item) => (
              <div className="flex flex-col">
                <span className="font-medium">Name: {item?.updater?.name}</span>
                <span className="text-xs text-gray-500">Email: {item?.updater?.email}</span>
                <span className="text-xs text-gray-500">Phone: {item?.updater?.phone}</span>
                <span className="text-xs text-gray-500">Location: {item?.updater?.location}</span>
                <span className="text-xs text-gray-500">Role: {item?.updater?.role}</span>
              </div>
            ),
          },
        ]}
      />
    </Modal>
  );
};

export default ViewSizeModal;