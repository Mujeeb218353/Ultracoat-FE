"use client";

import Modal from "@/components/Modal";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { User } from "lucide-react";
import { Feature } from "../types/features.types";
import useFeatureById from "../hooks/use-feature-by-id";
import DataDescriptions from "@/components/Description";
import dayjs from "dayjs";
import { Tag } from "antd";

const ViewFeatureModal = () => {
    const activeModal = useActiveModal();
    const closeModal = useCloseModal();
    const data = useModalData<Feature>();
    const isOpen = activeModal === "VIEW_FEATURE";

    const { data: feature, isLoading } = useFeatureById(isOpen ? data?.id : undefined);

    return (
        <Modal
          open={isOpen}
          onCancel={closeModal}
          title="Feature Details"
          description="Feature information."
          icon={<User size={20} className="text-gray-400" />}
        >
          <DataDescriptions
            loading={isLoading}
            data={feature}
            title="Feature Details"
            fields={[
              { 
                label: "Name", 
                render: (item) => item.name 
              },
              { 
                label: "Status", 
                render: (item) => item.isActive ? "Active" : "In Active" 
              },
              { 
                label: "Created At", 
                render: (item) => dayjs(item.createdAt).format("HH:mm A, DD MMM YYYY") 
              },
              {
                label: "Updated At",
                render: (item) => dayjs(item.updatedAt).format("HH:mm A, DD MMM YYYY")
              },
              {
                label: "Option Groups",
                span: 2,
                render: (item) => (
                  <div className="flex flex-col gap-1">
                    {(item.optionGroups ?? []).map((g) => (
                      <div key={g.id} className="flex flex-col gap-1">
                        <span className="font-bold">{g.label}</span>
                        <div className="flex flex-col gap-1">
                          {(g.values ?? []).map((v) => (
                            <Tag color="green" key={v.id} className="w-fit text-xs text-gray-500">{v.label || v.value}</Tag>
                          ))}
                        </div>
                      </div>
                    ))}
                    {(!item.optionGroups || item.optionGroups.length === 0) && <span className="text-xs text-gray-400">—</span>}
                  </div>
                ),
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
                    <span className="text-xs text-gray-500">Role: {rep?.updater?.role}</span>
                    <span className="text-xs text-gray-500">Location: {rep?.updater?.location}</span>
                  </div>
                ),
              },
            ]}
          />
        </Modal>
    );
};

export default ViewFeatureModal;