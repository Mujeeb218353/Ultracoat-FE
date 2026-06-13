"use client";

import { Form, Input, Button, Typography, Checkbox, Flex } from "antd";
import { User, Lock, Eye, EyeOff } from "lucide-react";import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { loginSchema } from "../schemas/auth.schema";
import { LoginRequest } from "../types/auth.types";
import useLogin from "../hooks/use-login";
import { Image } from "antd";
import UltraCoatImg from "../../../../public/ultra-coat-image.png";

const LoginForm = () => {
  const { mutate: login, isPending } = useLogin();
  const [form] = Form.useForm<LoginRequest>();

  const onFinish = (values: LoginRequest) => {
    login(values);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="w-full px-8 bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
        
        <div className="p-8 text-center flex flex-col items-center gap-6">
          <div className="p-3.5 bg-[#142131]/60 border border-white/10 rounded-xl shadow-[inset_0_2px_4px_rgba(255,255,255,0.05), 0_10px_20px_rgba(0,0,0,0.3)]">
            <Image 
              src={UltraCoatImg.src} 
              alt="Ultracoat Pakistan Logo" 
              width={200}
              preview={false}
            />
          </div>

          <Typography.Title level={5} className="text-white/80! text-sm! font-medium! mt-1!">
            Sales & Quotation Management System
          </Typography.Title>

          <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#007A33]/50 bg-[#007A33]/10 rounded-full">
            <ShieldCheck className="size-4 text-[#007A33]" />
            <Typography.Text className="text-white/60! text-xs font-semibold tracking-wider">
              SECURE LOGIN
            </Typography.Text>
          </div>
        </div>

        <div className="h-xs w-full bg-linear-to-r from-transparent via-white/15 to-transparent shadow-[0_1px_4px_rgba(255,255,255,0.05)]" />

        <Form
          form={form}
          name="login_form"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onSubmit"
          className="p-10 pb-6 flex flex-col gap-6"
          initialValues={{ email: "", password: "", remember: false }} 
        >
          <Form.Item
            name="email"
            label={
              <Typography.Text className="text-sm! text-white/80! font-medium!">
                Username
              </Typography.Text>
            }
            className="m-0! flex flex-col gap-2"
            rules={[
              {
                validator: async (_, value) => {
                  const result = loginSchema.shape.email.safeParse(value);
                  if (!result.success) return Promise.reject(result.error.issues[0].message);
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input
              size="medium"
              prefix={<User className="text-gray-400! mr-2"  size={15}/>}
              placeholder="Enter your username"
              className="login-input-custom text-gray-200! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-400!"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label={
              <Typography.Text className="text-sm! text-white/80! font-medium!">
                Password
              </Typography.Text>
            }
            className="m-0! flex flex-col gap-2"
            rules={[
              {
                validator: async (_, value) => {
                  const result = loginSchema.shape.password.safeParse(value);
                  if (!result.success) return Promise.reject(result.error.issues[0].message);
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              size="medium"
              prefix={<Lock className="text-gray-200! mr-2"  size={15}/>}
              placeholder="Enter your password"
              className="login-input-custom text-gray-300! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-400! [&_.ant-input-password-icon]:text-white/40! [&_.ant-input-password-icon:hover]:text-white/70!"
              iconRender={(visible) => visible ? <Eye size={15} /> : <EyeOff size={15} />}
            />
          </Form.Item>

          <Flex justify="space-between" align="center" className="text-sm pt-1">
            {/* <Form.Item name="remember" valuePropName="checked" className="m-0!">
              <Checkbox className="dark-checkbox">
                <span className="text-white/70! ml-1.5!">Remember me</span>
              </Checkbox>
            </Form.Item> */}
            
            <Link
              href="/auth/forgot-password"
              className="text-xs text-blue-500 hover:underline!"
            >
              Forgot password?
            </Link>
          </Flex>

          <div className="pt-2">
            <Button
              htmlType="submit"
              loading={isPending}
              block
              size="medium"
              className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800! focus:bg-green-800! active:bg-green-800!"
            >
              Sign In
            </Button>
          </div>
        </Form>

        <div className="w-full! h-0 bg-white/10 border-t-2 mt-2" />

        <div className="p-6 text-center text-xs">
          <Typography.Text className="text-white/40! text-xs!">
            PSO Ultracoat Marketing • Enterprise Portal
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;