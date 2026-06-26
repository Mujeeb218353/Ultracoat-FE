"use client";

import { Form, Input, Button, Typography, Flex } from "antd";
import { User } from "lucide-react";
import Link from "next/link";
import { forgotPasswordSchema } from "../schemas/auth.schema";
import { ForgotPasswordRequest } from "../types/auth.types";
import useForgotPassword from "../hooks/use-forgot-password";

const ForgotPasswordForm = () => {
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const [form] = Form.useForm<ForgotPasswordRequest>();

  const onFinish = (values: ForgotPasswordRequest) => {
    forgotPassword(values, {
      onSuccess: () => {
        form.resetFields();
      },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-t border-b border-white/20 py-4">
      <Form
        form={form}
        name="forgot_password_form"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
        className="flex flex-col gap-6 w-full! px-4!"
        initialValues={{ email: "" }}
      >
        <Form.Item
          name="email"
          label={
            <Typography.Text className="text-sm! text-white/80! font-medium!">
              Email
            </Typography.Text>
          }
          className="m-0! flex flex-col gap-2"
          rules={[
            {
              validator: async (_, value) => {
                const result = forgotPasswordSchema.shape.email.safeParse(value);
                if (!result.success) return Promise.reject(result.error.issues[0].message);
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            size="medium"
            prefix={<User className="text-gray-400! mr-2" size={15} />}
            placeholder="Enter your email"
            className="login-input-custom text-gray-200! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-400!"
          />
        </Form.Item>

        <Flex justify="space-between" align="center" className="text-sm pt-1">
          <Link
            href="/auth/login"
            className="text-xs text-blue-500 hover:underline!"
          >
            Back to Login
          </Link>
        </Flex>

        <div className="">
          <Button
            htmlType="submit"
            loading={isPending}
            block
            size="medium"
            className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800! focus:bg-green-800! active:bg-green-800!"
          >
            {isPending ? "Sending..." : "Send OTP"}
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;