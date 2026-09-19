"use client";

import { Form, Button } from "antd";
import { User, Mail, Phone, MapPin, Building, Briefcase } from "lucide-react";
import Modal from "@/components/Modal";
import FormField from "@/components/FormField";
import { createCustomerSchema } from "../schemas/customers.schema";
import { Customer } from "../types/customers.types";
import useCreateCustomer from "../hooks/use-create-customer";
import { useActiveModal, useCloseModal } from "@/features/modal/selectors/modal.selector";

const CreateCustomerModal = () => {
  const activeModal = useActiveModal();
  const closeModal = useCloseModal();
  const [form] = Form.useForm();
  const { mutate: createCustomer, isPending } = useCreateCustomer();

  const handleFinish = (values: Customer) => {
    createCustomer(values, {
      onSuccess: () => {
        form.resetFields();
        closeModal();
      },
    });
  };

  return (
    <Modal
      open={activeModal === "CREATE_CUSTOMER"}
      onCancel={closeModal}
      title="Add Customer"
      description="Fill in the details below."
      icon={<User size={20} className="text-gray-400" />}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        initialValues={{ isActive: true, isVerified: false }}
        className="flex! flex-col! gap-2!"
      >
        <FormField
          name="name"
          label="Full Name"
          type="text"
          schema={createCustomerSchema.shape.name}
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
            schema={createCustomerSchema.shape.email}
            required
            icon={<Mail className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="customer@example.com"
            size="small"
          />

          <FormField
            name="phone"
            label="Contact Number"
            type="text"
            schema={createCustomerSchema.shape.phone}
            required
            icon={<Phone className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="+92 321 1234567"
            size="small"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            name="company"
            label="Company"
            type="text"
            schema={createCustomerSchema.shape.company}
            required
            icon={<Building className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="ABC Corporation"
            size="small"
          />

          <FormField
            name="designation"
            label="Designation"
            type="text"
            schema={createCustomerSchema.shape.designation}
            required
            icon={<Briefcase className="w-4 h-4 text-gray-400 mr-1" />}
            placeholder="Software Engineer"
            size="small"
          />
        </div>

        <FormField
          name="location"
          label="Location"
          type="text"
          schema={createCustomerSchema.shape.location}
          required
          icon={<MapPin className="w-4 h-4 text-gray-400 mr-1" />}
          placeholder="Karachi, Pakistan"
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
            Create Customer
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default CreateCustomerModal;