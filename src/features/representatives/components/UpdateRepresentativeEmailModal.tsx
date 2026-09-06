"use client";

import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { useActiveModal, useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Button, Form } from "antd";
import { Mail } from "lucide-react";
import { Representative } from "../types/representatives.types";
import { updateRepresentativeEmailSchema } from "../schemas/representatives.schema";
import useUpdateRepresentativeEmail from "../hooks/use-update-representative-email";

const UpdateRepresentativeEmailModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const modalData = useModalData<Representative>();
  const [form] = Form.useForm();
  const { mutate: updateRepresentativeEmail, isPending } = useUpdateRepresentativeEmail();

  const isOpen = activeModal === "UPDATE_REPRESENTATIVE_EMAIL";

  if (!isOpen || !modalData?.id) return null;

  const handleFinish = (values: { email: string }) => {
    updateRepresentativeEmail(
      { id: modalData.id!, email: values.email },
      {
        onSuccess: () => {
          form.resetFields();
          closeModal();
        },
      },
    );
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Update Representative Email"
      description="Confirm and save the new email address."
      icon={<Mail size={20} className="text-gray-400" />}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ email: modalData.email }}
        key={modalData.id}
        preserve={false}
        className="flex! flex-col! gap-4!"
      >
        <FormField
          name="email"
          label="Email Address"
          type="email"
          schema={updateRepresentativeEmailSchema.shape.email}
          required
          placeholder="john.doe@psultracoat.com"
          size="small"
        />

        <div className="w-full flex flex-col-reverse sm:flex-row items-center gap-4 justify-center sm:justify-end">
          <Button
            disabled={isPending}
            onClick={closeModal}
            className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!"
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Update Email
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default UpdateRepresentativeEmailModal;