"use client";

import { useEffect } from "react";
import { Modal, Form, Input, Button } from "antd";
import { User, Phone, MapPin } from "lucide-react";
import { useUser } from "@/features/auth/selectors/auth.selector";
import useUpdateProfile from "@/features/auth/hooks/use-update-profile";
import { updateProfileSchema } from "@/features/auth/schemas/auth.schema";
import { UpdateProfileRequest } from "@/features/auth/types/auth.types";

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

    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        validateTrigger="onSubmit"
        className="pt-2"
      >
        <Form.Item
          name="name"
          label="Full Name"
          rules={[
            {
              validator: async (_, value) => {
                const result = updateProfileSchema.shape.name.safeParse(value);
                if (!result.success) return Promise.reject(result.error.issues[0].message);
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input prefix={<User size={15} className="text-gray-400 mr-1" />} placeholder="Full name" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[
            {
              validator: async (_, value) => {
                const result = updateProfileSchema.shape.phone.safeParse(value);
                if (!result.success) return Promise.reject(result.error.issues[0].message);
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input prefix={<Phone size={15} className="text-gray-400 mr-1" />} placeholder="Phone number" />
        </Form.Item>

        <Form.Item
          name="location"
          label="Location"
          rules={[
            {
              validator: async (_, value) => {
                const result = updateProfileSchema.shape.location.safeParse(value);
                if (!result.success) return Promise.reject(result.error.issues[0].message);
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input prefix={<MapPin size={15} className="text-gray-400 mr-1" />} placeholder="Location" />
        </Form.Item>

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