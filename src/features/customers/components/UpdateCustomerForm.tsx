"use client";

import FormField from "@/components/FormField";
import { useCloseModal } from "@/features/modal/selectors/modal.selector";
import { Button, Form } from "antd";
import { Mail, MapPin, Phone, User } from "lucide-react";
import useUpdateCustomer from "../hooks/use-update-customer";
import { updateCustomerSchema } from "../schemas/customers.schema";
import { Customer } from "../types/customers.types";

interface UpdateCustomerFormProps {
  customer: Customer;
}

const UpdateCustomerForm = ({ customer }: UpdateCustomerFormProps) => {
  const [form] = Form.useForm();
  const closeModal = useCloseModal();
  const { mutate: updateCustomer, isPending } = useUpdateCustomer();

  const handleFinish = (values: Customer) => {
    updateCustomer(values, {
      onSuccess: () => {
        closeModal();
      },
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      initialValues={customer}
      className="flex! flex-col! gap-2!"
      key={customer?.id}
      preserve={false}
    >
      <FormField name="id" hidden={true} />
      <FormField
        name="name"
        label="Full Name"
        type="text"
        schema={updateCustomerSchema.shape.name}
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
          schema={updateCustomerSchema.shape.email}
          required
          icon={<Mail className="w-4 h-4 text-gray-400 mr-1" />}
          placeholder="customer@example.com"
          size="small"
        />

        <FormField
          name="phone"
          label="Contact Number"
          type="text"
          schema={updateCustomerSchema.shape.phone}
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
        schema={updateCustomerSchema.shape.location}
        required
        icon={<MapPin className="w-4 h-4 text-gray-400 mr-1" />}
        placeholder="Karachi, Pakistan"
        size="small"
      />

      <FormField
        name="company"
        label="Company"
        type="text"
        schema={updateCustomerSchema.shape.company}
        required
        icon={<MapPin className="w-4 h-4 text-gray-400 mr-1" />}
        placeholder="Karachi, Pakistan"
        size="small"
      />

      <FormField
        name="designation"
        label="Designation"
        type="text"
        schema={updateCustomerSchema.shape.designation}
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
          Update Customer
        </Button>
      </div>
    </Form>
  );
};

export default UpdateCustomerForm;