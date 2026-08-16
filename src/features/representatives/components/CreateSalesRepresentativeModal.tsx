"use client";

import { Form, Checkbox, Button } from "antd";
import { User, Mail, Phone, MapPin, Lock } from "lucide-react";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { createRepresentativeSchema } from "../schemas/representatives.schema";
import { Representative } from "../types/representatives.types";
import useCreateRepresentative from "../hooks/use-create-representative";
import { useActiveModal, useCloseModal } from "@/features/modal/selectors/modal.selector";

const CreateRepresentativeModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();

  const [form] = Form.useForm();

  const { mutate: createRepresentative, isPending } = useCreateRepresentative();


  const handleFinish = (values: Representative) => {
    createRepresentative(values, {
      onSuccess: () => {
        form.resetFields();
        closeModal();
      },
    });
  };

  return (
    <Modal
      open={activeModal === "CREATE_REPRESENTATIVE"}
      onCancel={closeModal}
      title="Add Sales Representative"
      description="Fill in the details below."
      icon={<User size={20} className="text-gray-400" />}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ isActive: true }}
        className="flex! flex-col! gap-2!"
      >
        <FormField
          name="name"
          label="Full Name"
          type="text"
          schema={createRepresentativeSchema.shape.name}
          placeholder="John Doe"
          size="small"
          required
          icon={<User className="w-4 h-4 text-gray-400 mr-1" />}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="email"
            label="Email Address"
            type="email"
            schema={createRepresentativeSchema.shape.email}
            required
            icon={<Mail className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="john.doe@psultracoat.com"
            size="small"
          />

          <FormField
            name="phone"
            label="Contact Number"
            type="text"
            schema={createRepresentativeSchema.shape.phone}
            required
            icon={<Phone className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="+92 321 1234567"
            size="small"
          />
        </div>

        <FormField
          name="location"
          label="Location"
          type="text"
          schema={createRepresentativeSchema.shape.location}
          required
          icon={<MapPin className="w-4 h-4 text-gray-400 mr-1" />}
          placeholder="Karachi, Pakistan"
          size="small"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="password"
            label="Password"
            type="password"
            schema={createRepresentativeSchema.shape.password}
            required
            icon={<Lock className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="••••••••"
            size="small"
          />

          <FormField
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            schema={createRepresentativeSchema.shape.confirmPassword}
            dependencies={["password"]}
            customValidator={(value, allValues) =>
              value !== allValues.password ? "Passwords do not match" : null
            }
            icon={<Lock className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="••••••••"
            size="small"
          />
        </div>

        <Form.Item 
          name="isActive" 
          valuePropName="checked" 
          className="mt-2!"
        >
          <Checkbox 
            className="font-medium text-gray-700 dark:text-gray-300"
          >
            Active Representative
          </Checkbox>
        </Form.Item>

        <div className="w-full flex flex-col-reverse sm:flex-row items-center gap-4 justify-center sm:justify-end">
            <Button
              disabled={isPending}
              onClick={closeModal}
              className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!"
            >
              Cancel
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={isPending}
            >
              Create Representative
            </Button>
        </div>

      </Form>
    </Modal>
  );
};

export default CreateRepresentativeModal;