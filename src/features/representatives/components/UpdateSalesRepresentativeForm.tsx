"use client";

import FormField from "@/components/FormField";
import { useCloseModal } from "@/features/modal/selectors/modal.selector";
import { Button, Form } from "antd";
import { Mail, MapPin, Phone, User } from "lucide-react";
import useUpdateRepresentative from "../hooks/use-update-representative";
import { updateRepresentativeSchema } from "../schemas/representatives.schema";
import { Representative } from "../types/representatives.types";

interface UpdateSalesRepresentativeFormProps {
  salesRepresentative: Representative;
}

const UpdateSalesRepresentativeForm = ({ salesRepresentative }: UpdateSalesRepresentativeFormProps) => {
  const [form] = Form.useForm();
  const closeModal = useCloseModal();
  const { mutate: updateRepresentative, isPending } = useUpdateRepresentative();

  const handleFinish = (values: Representative) => {
  
    updateRepresentative(values, {
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
      initialValues={salesRepresentative}
      className="flex! flex-col! gap-2!"
      key={salesRepresentative?.id}
      preserve={false}
    >
      <FormField
        name="id"
        hidden={true}
      />
      <FormField
        name="name"
        label="Full Name"
        type="text"
        schema={updateRepresentativeSchema.shape.name}
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
          schema={updateRepresentativeSchema.shape.email}
          required
          icon={<Mail className="w-4 h-4 text-gray-400 mr-1" />}
          placeholder="john.doe@psultracoat.com"
          size="small"
        />

        <FormField
          name="phone"
          label="Contact Number"
          type="text"
          schema={updateRepresentativeSchema.shape.phone}
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
        schema={updateRepresentativeSchema.shape.location}
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
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
          >
            Update Representative
          </Button>
      </div>

    </Form>
  );
};

export default UpdateSalesRepresentativeForm;