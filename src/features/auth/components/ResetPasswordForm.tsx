"use client";

import { useEffect, useState } from "react";
import { Form, Button, Typography } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import FormField from "@/components/FormField";
import { resetPasswordSchema, loginSchema } from "../schemas/auth.schema";
import useResetPassword from "../hooks/use-reset-password";
import useForgotPassword from "../hooks/use-forgot-password";
import { Lock, ShieldCheck, RotateCw, Mail, ArrowLeft } from "lucide-react";

const OTP_EXPIRY_SECONDS = 5 * 60;
const RESEND_COOLDOWN_SECONDS = 60;

interface PasswordStepValues {
  newPassword: string;
  confirmNewPassword: string;
}

interface OtpStepValues {
  otp: string;
}

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const { mutate: resetPassword, isPending } = useResetPassword();
  const { mutate: forgotPassword, isPending: isForgotPasswordPending } = useForgotPassword();

  const [passwordForm] = Form.useForm<PasswordStepValues>();
  const [otpForm] = Form.useForm<OtpStepValues>();

  const [step, setStep] = useState<"password" | "otp">("password");
  const [pendingPassword, setPendingPassword] = useState<PasswordStepValues | null>(null);

  const [otpExpiresIn, setOtpExpiresIn] = useState(() => {
    if (typeof window === "undefined") return OTP_EXPIRY_SECONDS;
    const sentAt = sessionStorage.getItem("otp_sent_at");
    if (!sentAt) return OTP_EXPIRY_SECONDS;
    const elapsed = Math.floor((Date.now() - Number(sentAt)) / 1000);
    return Math.max(0, OTP_EXPIRY_SECONDS - elapsed);
  });
  const [resendCooldown, setResendCooldown] = useState(0);
  const [otpFailed, setOtpFailed] = useState(false);

  const hasValidSession =
    !!email &&
    sessionStorage.getItem("otp_flow_email") === email &&
    !!sessionStorage.getItem("otp_sent_at");

  const isOtpExpired = otpExpiresIn <= 0;
  const isExpiringSoon = otpExpiresIn > 0 && otpExpiresIn <= 30;
  const showResend = isOtpExpired || otpFailed;

  useEffect(() => {
    if (!hasValidSession) {
      router.replace("/auth/forgot-password");
    }
  }, [hasValidSession, router]);

  useEffect(() => {
    if (!hasValidSession || step !== "otp" || otpExpiresIn <= 0) return;
    const t = setInterval(() => setOtpExpiresIn((p) => (p <= 1 ? 0 : p - 1)), 1000);
    return () => clearInterval(t);
  }, [hasValidSession, step, otpExpiresIn]);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const t = setInterval(() => setResendCooldown((p) => (p <= 1 ? 0 : p - 1)), 1000);
    return () => clearInterval(t);
  }, [resendCooldown]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const onPasswordFinish = (values: PasswordStepValues) => {
    setPendingPassword(values);
    setStep("otp");
  };

  const onOtpFinish = (values: OtpStepValues) => {
    if (!pendingPassword) return;

    resetPassword(
      { email, otp: values.otp, newPassword: pendingPassword.newPassword },
      {
        onSuccess: () => {
          sessionStorage.removeItem("otp_flow_email");
          sessionStorage.removeItem("otp_sent_at");
        },
        onError: () => {
          setOtpFailed(true);
        },
      },
    );
  };

  const handleResend = () => {
    forgotPassword(
      { email },
      {
        onSuccess: () => {
          sessionStorage.setItem("otp_sent_at", Date.now().toString());
          setOtpExpiresIn(OTP_EXPIRY_SECONDS);
          setResendCooldown(RESEND_COOLDOWN_SECONDS);
          setOtpFailed(false);
          otpForm.setFieldValue("otp", "");
        },
      },
    );
  };

  const handleBackToPassword = () => {
    otpForm.resetFields();
    setOtpFailed(false);
    setStep("password");
  };

  const progressPercent = Math.max(0, (otpExpiresIn / OTP_EXPIRY_SECONDS) * 100);

  if (!hasValidSession) return null;

  if (step === "password") {
    return (
      <div className="flex flex-col items-center justify-center gap-6 border-t border-b border-white/10 py-6">
        <div className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Mail className="text-white/50" size={14} />
          <Typography.Text className="text-xs! text-white/70!">{email}</Typography.Text>
        </div>

        <Form
          form={passwordForm}
          name="new_password_form"
          onFinish={onPasswordFinish}
          layout="vertical"
          requiredMark={false}
          validateTrigger="onSubmit"
          className="flex flex-col gap-6 w-full! px-6!"
          initialValues={pendingPassword ?? undefined}
        >
          <FormField
            name="newPassword"
            label="New Password"
            type="password"
            schema={loginSchema.shape.password}
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
              const result = loginSchema.shape.password.safeParse(value);
              return result.success ? null : result.error.issues[0].message;
            }}
            icon={<Lock className="text-gray-400! mr-2" size={15} />}
            placeholder="Re-enter your new password"
          />

          <Button
            htmlType="submit"
            block
            size="medium"
            className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800!"
          >
            Continue
          </Button>
        </Form>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center gap-6 border-t border-b border-white/10 py-6">
      <Form
        form={otpForm}
        name="verify_otp_form"
        onFinish={onOtpFinish}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
        className="flex flex-col gap-6 w-full! px-6!"
        initialValues={{ otp: "" }}
      >
        <button
          type="button"
          onClick={handleBackToPassword}
          className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 transition-colors self-start"
        >
          <ArrowLeft size={13} />
          Back
        </button>

        <div className="flex items-center justify-center gap-2 mx-auto px-4 py-2 rounded-full bg-white/5 border border-white/10">
          <Mail className="text-white/50" size={14} />
          <Typography.Text className="text-xs! text-white/70!">{email}</Typography.Text>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="text-[#018739]" size={16} />
            <Typography.Text className="text-sm! text-white/80! font-semibold! tracking-wide!">
              Enter OTP
            </Typography.Text>
          </div>

          <FormField
            name="otp"
            type="otp"
            otpLength={4}
            disabled={isOtpExpired}
            schema={resetPasswordSchema.shape.otp}
            onChange={() => setOtpFailed(false)}
          />

          <div className="w-full max-w-64 flex flex-col gap-1.5">
            <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                  isOtpExpired ? "bg-red-500" : isExpiringSoon ? "bg-amber-500" : "bg-[#018739]"
                }`}
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-center">
              {isOtpExpired ? (
                <Typography.Text className="text-xs! text-red-400! font-medium!">
                  Code expired
                </Typography.Text>
              ) : otpFailed ? (
                <Typography.Text className="text-xs! text-red-400! font-medium!">
                  Incorrect code
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

          {showResend && (
            <Button
              type="link"
              onClick={handleResend}
              disabled={resendCooldown > 0}
              loading={isForgotPasswordPending}
              icon={<RotateCw size={12} />}
              className="text-xs! text-blue-400! disabled:text-white/30! flex! items-center! gap-1.5! p-0! h-auto!"
            >
              {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : "Resend code"}
            </Button>
          )}
        </div>

        <Button
          htmlType="submit"
          loading={isPending}
          disabled={isOtpExpired}
          block
          size="medium"
          className="bg-green-700! border-none! text-white! font-semibold! hover:bg-green-800! disabled:opacity-40!"
        >
          {isPending ? "Resetting..." : "Reset Password"}
        </Button>
      </Form>
    </div>
  );
};

export default ResetPasswordForm;