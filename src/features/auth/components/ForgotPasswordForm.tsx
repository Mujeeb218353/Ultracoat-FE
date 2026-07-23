"use client";

import { Form, Button, Flex } from "antd";
import { User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormField from "@/components/FormField";
import { forgotPasswordSchema } from "../schemas/auth.schema";
import { ForgotPasswordRequest } from "../types/auth.types";
import useForgotPassword from "../hooks/use-forgot-password";

const ForgotPasswordForm = () => {
  const router = useRouter();
  const { mutate: forgotPassword, isPending } = useForgotPassword();
  const [form] = Form.useForm<ForgotPasswordRequest>();

  const onFinish = (values: ForgotPasswordRequest) => {
    forgotPassword(values, {
      onSuccess: () => {
        sessionStorage.setItem("otp_flow_email", values.email);
        sessionStorage.setItem("otp_sent_at", Date.now().toString());
        router.push(`/auth/reset-password?email=${encodeURIComponent(values.email)}`);
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
        <FormField
          name="email"
          label="Email"
          type="email"
          schema={forgotPasswordSchema.shape.email}
          icon={<User className="text-gray-400! mr-2" size={15} />}
          placeholder="Enter your email"
        />

        <Flex justify="space-between" align="center" className="text-sm pt-1">
          <Link href="/auth/login" className="text-xs text-blue-500 hover:underline!">
            Login
          </Link>
        </Flex>

        <Button
          htmlType="submit"
          loading={isPending}
          block
          size="medium"
          className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800! focus:bg-green-800! active:bg-green-800!"
        >
          {isPending ? "Sending..." : "Send OTP"}
        </Button>
      </Form>
    </div>
  );
};

export default ForgotPasswordForm;