"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { resetPasswordSchema, loginSchema } from "../schemas/auth.schema";
import useResetPassword from "../hooks/use-reset-password";
import useForgotPassword from "../hooks/use-forgot-password";
import { ResetPasswordRequest } from "../types/auth.types";
import { Lock, Eye, EyeOff, ShieldCheck, RotateCw, Mail } from "lucide-react";

const RESEND_COOLDOWN_SECONDS = 5 * 60;
const OTP_EXPIRY_SECONDS = 5 * 60;

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { mutate: resetPassword, isPending } = useResetPassword();
  const { mutate: forgotPassword, isPending: isForgotPasswordPending } = useForgotPassword();

  const [form] = Form.useForm<ResetPasswordRequest>();

  const [verified, setVerified] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpExpiresIn, setOtpExpiresIn] = useState(OTP_EXPIRY_SECONDS);
  const isOtpExpired = otpExpiresIn <= 0;
  const isExpiringSoon = otpExpiresIn > 0 && otpExpiresIn <= 30;

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("otp_flow_email");
    const sentAt = sessionStorage.getItem("otp_sent_at");

    if (!email || storedEmail !== email || !sentAt) {
      router.replace("/auth/forgot-password");
      return;
    }

    const elapsedSeconds = Math.floor((Date.now() - Number(sentAt)) / 1000);
    const remaining = OTP_EXPIRY_SECONDS - elapsedSeconds;
    const t = window.setTimeout(() => {
      setOtpExpiresIn(remaining > 0 ? remaining : 0);
      setVerified(true);
    }, 0);
    return () => clearTimeout(t);
  }, [email, router]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => {
      setResendCooldown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    if (!verified || otpExpiresIn <= 0) return;
    const timer = setInterval(() => {
      setOtpExpiresIn((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [verified, otpExpiresIn]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const onFinish = (values: ResetPasswordRequest) => {
    resetPassword(
      { email, otp: values.otp, newPassword: values.newPassword },
      {
        onSuccess: () => {
          sessionStorage.removeItem("otp_flow_email");
          sessionStorage.removeItem("otp_sent_at");
        },
      },
    );
  };

  const handleResend = () => {
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          const now = Date.now();
          sessionStorage.setItem("otp_sent_at", now.toString());
          setResendCooldown(RESEND_COOLDOWN_SECONDS);
          setOtpExpiresIn(OTP_EXPIRY_SECONDS);
          form.setFieldValue("otp", "");
        },
      },
    );
  };

  const progressPercent = Math.max(0, (otpExpiresIn / OTP_EXPIRY_SECONDS) * 100);

  if (!verified) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 border-t border-b border-white/10 py-6">
      <Form
        form={form}
        name="reset_password_form"
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
        className="flex flex-col gap-6 w-full! px-6!"
        initialValues={{ otp: "" }}
      >
        <div className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Mail className="text-white/50" size={14} />
          <Typography.Text className="text-xs! text-white/70!">
            {email}
          </Typography.Text>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#018739]" size={16} />
            <Typography.Text className="text-sm! text-white/80! font-semibold! tracking-wide!">
              Enter OTP
            </Typography.Text>
          </div>

          <Form.Item
            name="otp"
            className="m-0! w-full! flex flex-col items-center!"
            rules={[
              {
                validator: async (_, value) => {
                  const result = resetPasswordSchema.shape.otp.safeParse(value);
                  if (!result.success)
                    return Promise.reject(result.error.issues[0].message);
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.OTP
              length={4}
              type="text"
              inputMode="numeric"
              size="small"
              disabled={isOtpExpired}
              className="w-full! max-w-64! justify-between! [&_.ant-otp-input]:size-14! [&_.ant-otp-input]:bg-[#142131]/40! [&_.ant-otp-input]:border-white/15! [&_.ant-otp-input]:text-white! [&_.ant-otp-input]:text-lg! [&_.ant-otp-input]:text-center! [&_.ant-otp-input]:font-bold! [&_.ant-otp-input]:rounded-xl! [&_.ant-otp-input]:transition-all! [&_.ant-otp-input:focus]:border-[#018739]! [&_.ant-otp-input:focus]:shadow-[0_0_0_3px_rgba(1,135,57,0.2)]!"
            />
          </Form.Item>

          <div className="w-full max-w-64 flex flex-col gap-1.5">
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${isOtpExpired ? "bg-red-500" : isExpiringSoon ? "bg-amber-500" : "bg-[#018739]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-center">
              {isOtpExpired ? (
                <Typography.Text className="text-xs! text-red-400! font-medium!">
                  Code expired — please resend
                </Typography.Text>
              ) : (
                <Typography.Text
                  className={`text-xs! ${isExpiringSoon ? "text-amber-400!" : "text-white/50!"}`}
                >
                  Expires in {formatTime(otpExpiresIn)}
                </Typography.Text>
              )}
            </div>
          </div>

          {resendCooldown > 0 && (
            <Button
              type="link"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              loading={isForgotPasswordPending}
              icon={<RotateCw size={12} />}
              className="text-xs! text-blue-400! disabled:text-white/30! flex! items-center! gap-1.5! p-0! h-auto!"
            >
              {"Resend code"}
            </Button>
          )}
        </div>

        <div className="h-px w-full bg-linear-to-r from-transparent via-white/15 to-transparent" />

        <div className="flex flex-col gap-5">
          <Form.Item
            name="newPassword"
            label={
              <Typography.Text className="text-sm! text-white/80! font-medium!">
                New Password
              </Typography.Text>
            }
            className="m-0! flex flex-col gap-2"
            rules={[
              {
                validator: async (_, value) => {
                  const result = loginSchema.shape.password.safeParse(value);
                  if (!result.success)
                    return Promise.reject(result.error.issues[0].message);
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              size="medium"
              prefix={<Lock className="text-gray-400! mr-2" size={15} />}
              placeholder="Enter your new password"
              className="login-input-custom text-gray-200! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-500! [&_.ant-input-password-icon]:text-white/40! [&_.ant-input-password-icon:hover]:text-white/70! focus-within:border-[#018739]!"
              iconRender={(visible) =>
                visible ? <Eye size={15} /> : <EyeOff size={15} />
              }
            />
          </Form.Item>

          <Form.Item
            name="confirmNewPassword"
            label={
              <Typography.Text className="text-sm! text-white/80! font-medium!">
                Confirm New Password
              </Typography.Text>
            }
            className="m-0! flex flex-col gap-2"
            dependencies={["newPassword"]}
            rules={[
              {
                validator: async (_, value) => {
                  const newPassword = form.getFieldValue("newPassword");
                  if (value !== newPassword) {
                    return Promise.reject("Passwords do not match");
                  }
                  const result = loginSchema.shape.password.safeParse(value);
                  if (!result.success)
                    return Promise.reject(result.error.issues[0].message);
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password
              size="medium"
              prefix={<Lock className="text-gray-400! mr-2" size={15} />}
              placeholder="Re-enter your new password"
              className="text-gray-200! w-full bg-[#142131]/30! border border-white/10! shadow-none! [&_input::placeholder]:text-gray-500! [&_.ant-input-password-icon]:text-white/40! [&_.ant-input-password-icon:hover]:text-white/70! focus-within:border-[#018739]!"
              iconRender={(visible) =>
                visible ? <Eye size={15} /> : <EyeOff size={15} />
              }
            />
          </Form.Item>
        </div>

        <Button
          htmlType="submit"
          loading={isPending}
          disabled={isOtpExpired}
          block
          size="medium"
          className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800! focus:bg-green-800! active:bg-green-800!"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;