"use client";

import { useEffect } from "react";
import { Modal, Form, Button } from "antd";
import { User, Phone, MapPin } from "lucide-react";
import { useUser } from "@/features/auth/selectors/auth.selector";
import useUpdateProfile from "@/features/auth/hooks/use-update-profile";
import { updateProfileSchema } from "@/features/auth/schemas/auth.schema";
import { UpdateProfileRequest } from "@/features/auth/types/auth.types";
import FormField from "@/components/FormField";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
}

const EditProfileModal = ({ open, onClose }: EditProfileModalProps) => {
  const user = useUser();
  const [form] = Form.useForm<UpdateProfileRequest>();
  const { mutate: updateProfile, isPending } = useUpdateProfile();

  useEffect(() => {
    if (open && user) {
      form.setFieldsValue({
        name: user.name,
        phone: user.phone,
        location: user.location,
      });
    }
  }, [open, user, form]);

  const onFinish = (values: UpdateProfileRequest) => {
    updateProfile(values, {
      onSuccess: () => onClose(),
    });
  };

  return (
    <Modal
      title="Edit Profile"
      open={open}
      onCancel={onClose}
      footer={null}
      destroyOnHidden
      className="dark:text-white!"
      centered

    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        validateTrigger="onSubmit"
        className="pt-2"
      >
        <FormField
          name="name"
          label="Full Name"
          icon={<User size={15} className="text-gray-400 mr-1" />}
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
    </Modal>
  );
};

export default EditProfileModal;