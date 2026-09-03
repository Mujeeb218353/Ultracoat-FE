"use client";

import FormField from "@/components/FormField";
import useUpdateProfile from "@/features/auth/hooks/use-update-profile";
import { updateProfileSchema } from "@/features/auth/schemas/auth.schema";
import { UpdateProfileRequest } from "@/features/auth/types/auth.types";
import { useCloseModal, useModalData } from "@/features/modal/selectors/modal.selector";
import { Button, Form } from "antd";
import { MapPin, Phone, User as UserIcon } from "lucide-react";

const UpdateProfileForm = () => {
  const onClose = useCloseModal();
  const user = useModalData<UpdateProfileRequest>();
  const [form] = Form.useForm<UpdateProfileRequest>();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  const onFinish = (values: UpdateProfileRequest) => {
    updateProfile(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      requiredMark={false}
      validateTrigger="onSubmit"
      className="pt-2"
      initialValues={user}
    >
      <FormField
        name="name"
        label="Full Name"
        icon={<UserIcon size={15} className="text-gray-400 mr-1" />}
        placeholder="Full name"
        schema={updateProfileSchema.shape.name}
      />

      <FormField
        name="phone"
        label="Phone Number"
        icon={<Phone size={15} className="text-gray-400 mr-1" />}
        placeholder="Phone number"
        schema={updateProfileSchema.shape.phone}
      />

      <FormField
        name="location"
        label="Location"
        icon={<MapPin size={15} className="text-gray-400 mr-1" />}
        placeholder="Location"
        schema={updateProfileSchema.shape.location}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button 
          disabled={isPending}
          onClick={onClose}
          className="dark:disabled:border-gray-600! dark:disabled:text-gray-400!"
        >
          Cancel
         </Button>
        <Button
          htmlType="submit"
          type="primary"
          loading={isPending}
        >
          Save Changes
        </Button>
      </div>
    </Form>
  )
}

export default UpdateProfileForm;