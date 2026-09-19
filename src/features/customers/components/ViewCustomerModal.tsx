"use client";

import Modal from "@/components/Modal";
import DataDescriptions from "@/components/Description";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { User } from "lucide-react";
import dayjs from "dayjs";
import useCustomerById from "../hooks/use-customer-by-id";
import { Customer } from "../types/customers.types";

const ViewCustomerModal = () => {
  const customer = useModalData<Customer>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();

  const isOpen = activeModal === "VIEW_CUSTOMER";
  const { data, isLoading } = useCustomerById(isOpen ? customer?.id : undefined);

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Customer Details"
      description="Customer information."
      icon={<User size={20} className="text-gray-400" />}
    >
      <DataDescriptions
        loading={isLoading}
        data={data}
        title="Customer Details"
        fields={[
          { label: "Name", render: (item) => item.name },
          { label: "Email", render: (item) => item.email },
          { label: "Phone", render: (item) => item.phone },
          { label: "Company", render: (item) => item.company },
          { label: "Designation", render: (item) => item.designation },
          { label: "Location", render: (item) => item.location },
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

export default ViewCustomerModal;