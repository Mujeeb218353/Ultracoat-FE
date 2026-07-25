"use client";

import { Form, Button, Flex, Checkbox } from "antd";
import { User, Lock } from "lucide-react";
import Link from "next/link";
import FormField from "@/components/FormField";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { LoginRequest } from "@/features/auth/types/auth.types";
import useLogin from "@/features/auth/hooks/use-login";

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const [form] = Form.useForm<LoginRequest>();

  const onFinish = (values: LoginRequest) => {
    login(values, {
      onSuccess: () => form.resetFields(),
    });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 border-t border-b border-white/20 py-4">
      <Form
        form={form}
        name="login_form"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
        className="flex flex-col gap-6 w-full! px-4!"
        initialValues={{ email: "", password: "", remember: false }}
      >
        <FormField
          name="email"
          label="Email"
          type="email"
          schema={loginSchema.shape.email}
          icon={<User className="text-gray-400! mr-2" size={15} />}
          placeholder="Enter your email"
          className="text-gray-200! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-500! [&_.ant-input-password-icon]:text-white/40! [&_.ant-input-password-icon:hover]:text-white/70! focus-within:border-[#018739]!"
        />

        <FormField
          name="password"
          label="Password"
          type="password"
          schema={loginSchema.shape.password}
          icon={<Lock className="text-gray-200! mr-2" size={15} />}
          placeholder="Enter your password"
          className="text-gray-200! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-500! [&_.ant-input-password-icon]:text-white/40! [&_.ant-input-password-icon:hover]:text-white/70! focus-within:border-[#018739]!"
        />

        <Flex justify="space-between" align="center" className="text-sm pt-1">
          <Form.Item name="remember" valuePropName="checked" className="m-0!">
            <Checkbox className="[&_.ant-checkbox-inner]:bg-[#142131]/30! [&_.ant-checkbox-inner]:border-white/20!">
              <span className="text-white/70! text-xs!">Remember me</span>
            </Checkbox>
          </Form.Item>

          <Link href="/auth/forgot-password" className="text-xs text-blue-500 hover:underline!">
            Forgot password?
          </Link>
        </Flex>

        <Button
          htmlType="submit"
          loading={isPending}
          block
          size="medium"
          className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800! focus:bg-green-800! active:bg-green-800!"
        >
          {isPending ? "Authenticating..." : "Login"}
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;