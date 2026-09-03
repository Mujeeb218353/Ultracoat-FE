"use client";

import FormField from "@/components/FormField";
import useUpdatePassword from "../hooks/use-update-password";
import { updatePasswordSchema } from "@/features/auth/schemas/auth.schema";
import { UpdatePasswordRequest } from "@/features/auth/types/auth.types";
import { Button, Form } from "antd";
import { Lock, ShieldKeyhole } from "lucide-react";
import { useActiveModal, useCloseModal } from "@/features/modal/selectors/modal.selector";
import Modal from "@/components/Modal";

const UpdatePasswordForm = () => {
  const onClose = useCloseModal();
  const activeModal = useActiveModal();
  const [form] = Form.useForm();
  const { mutate: updatePassword, isPending } = useUpdatePassword();
  const open = activeModal === "UPDATE_PASSWORD";

  const onFinish = (values: UpdatePasswordRequest) => {
    updatePassword(values, {
      onSuccess: () => {
        form.resetFields();
        onClose();
      },
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title="Edit Password"
      description="Update your password"
      icon={<ShieldKeyhole size={20} className="text-gray-400" />}
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
          name="currentPassword"
          label="Current Password"
          type="password"
          schema={updatePasswordSchema.shape.currentPassword}
          icon={<Lock className="text-gray-400! mr-2" size={15} />}
          placeholder="Enter your current password"
        />
  
        <FormField
          name="newPassword"
          label="New Password"
          type="password"
          schema={updatePasswordSchema.shape.newPassword}
          icon={<Lock className="text-gray-400! mr-2" size={15} />}
          placeholder="Enter your new password"
        />
  
        <FormField
          name="confirmNewPassword"
          label="Confirm New Password"
          type="password"
          dependencies={["newPassword"]}
          customValidator={(value, allValues) => {
            if (value !== allValues.newPassword) return "Passwords do not match";
            const result = updatePasswordSchema.shape.confirmNewPassword.safeParse(value);
            return result.success ? null : result.error.issues[0].message;
          }}
          icon={<Lock className="text-gray-400! mr-2" size={15} />}
          placeholder="Re-enter your new password"
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
            Update Password
          </Button>
        </div>
      </Form>
    </Modal>
  )
}

export default UpdatePasswordForm;