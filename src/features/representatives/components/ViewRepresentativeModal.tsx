"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { User } from "lucide-react";
import { Representative } from "../types/representatives.types";
import useRepresentativeById from "../hooks/use-representative-by-id";
import DataDescriptions from "@/components/Description";
import dayjs from "dayjs";


const ViewRepresentativeModal = () => {
  const rep = useModalData<Representative>();
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  
  const isOpen = activeModal === "VIEW_REPRESENTATIVE";
  const { data, isLoading } = useRepresentativeById(isOpen ? rep?.id : undefined);

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Sales Representative"
      description="Representative details."
      icon={<User size={20} className="text-gray-400" />}
    >
      <DataDescriptions
      loading={isLoading}
      data={data}
      title="Representative Details"
      fields={[
        { 
          label: "Name", 
          render: (rep) => rep.name 
        },
        { 
          label: "Email", 
          render: (rep) => rep.email 
        },
        { 
          label: "Phone", 
          render: (rep) => rep.phone },
        {
          label: "Status",
          render: (rep) => (rep.isActive ? "Active" : "In Active"),
        },
        { 
          label: "Location", 
          span: 2, 
          render: (rep) => rep.location },
        { 
          label: "Created At", 
          render: (rep) => dayjs(rep.createdAt).format("HH:mm A, DD MMM YYYY") 
        },
        { 
          label: "Updated At",
          render: (rep) => dayjs(rep.updatedAt).format("HH:mm A, DD MMM YYYY") 
        },
        {
          label: "Created By",
          span: 2,
          render: (rep) => (
            <div className="flex flex-col">
              <span className="font-medium">Name: {rep?.creator?.name}</span>
              <span className="text-xs text-gray-500">Email: {rep?.creator?.email}</span>
              <span className="text-xs text-gray-500">Phone: {rep?.creator?.phone}</span>
              <span className="text-xs text-gray-500">Role: {rep?.creator?.role}</span>
              <span className="text-xs text-gray-500">Location: {rep?.creator?.location}</span>
            </div>
          ),
        },
        {
          label: "Updated By",
          span: 2,
          render: (rep) => (
            <div className="flex flex-col">
              <span className="font-medium">Name: {rep?.updater?.name}</span>
              <span className="text-xs text-gray-500">Email: {rep?.updater?.email}</span>
              <span className="text-xs text-gray-500">Phone: {rep?.updater?.phone}</span>
              <span className="text-xs text-gray-500">Location: {rep?.updater?.location}</span>
              <span className="text-xs text-gray-500">Role: {rep?.updater?.role}</span>
            </div>
          ),
        },
      ]}
    />
    </Modal>
  );
};

export default ViewRepresentativeModal;