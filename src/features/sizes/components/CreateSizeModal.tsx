"use client";

import { Button, Checkbox, Form } from "antd";
import { Ruler } from "lucide-react";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { useActiveModal, useCloseModal } from "@/features/modal/selectors/modal.selector";
import { createSizeSchema } from "../schemas/sizes.schema";
import { Size } from "../types/sizes.types";
import useCreateSize from "../hooks/use-create-size";

const CreateSizeModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const [form] = Form.useForm();
  const { mutate: createSize, isPending } = useCreateSize();

  const isOpen = activeModal === "CREATE_SIZE";

  const handleFinish = (values: Size) => {
    createSize(values, {
      onSuccess: () => {
        form.resetFields();
        closeModal();
      },
    });
  };

  return (
    <Modal
      open={isOpen}
      onCancel={closeModal}
      title="Add Die Size"
      description="Fill in the details below."
      icon={<Ruler size={20} className="text-gray-400" />}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ isActive: true }}
        className="flex! flex-col! gap-4!"
      >
        <FormField
          name="name"
          label="Size"
          type="text"
          schema={createSizeSchema.shape.name}
          placeholder="10 x 20 mm"
          size="small"
          required
        />

        <Form.Item 
          name="isActive" 
          hidden 
          valuePropName="checked"
        >
          <Checkbox 
            className="font-medium text-gray-700 dark:text-gray-300"
          />
        </Form.Item>

        <div className="w-full flex flex-col-reverse sm:flex-row items-center gap-4 justify-center sm:justify-end">
          <Button disabled={isPending} onClick={closeModal} className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={isPending}>
            Create Size
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateSizeModal;