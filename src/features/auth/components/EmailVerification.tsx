"use client";

import { useEffect, useState } from "react";
import { Button, Typography, Input, Form } from "antd";
import { MailCheck, ShieldCheck } from "lucide-react";
import useSendVerificationEmail from "../hooks/use-send-verification-email";
import useVerifyEmail from "../hooks/use-verify-email";
import { verifyEmailSchema } from "../schemas/auth.schema";
import { useUser } from "../selectors/auth.selector";

interface OtpFormValues {
  otp: string;
}

const OTP_EXPIRY_SECONDS = 5 * 60;

const EmailVerification = () => {
  const user = useUser();
  const [codeSent, setCodeSent] = useState(false);
  const [form] = Form.useForm<OtpFormValues>();

  const [otpExpiresIn, setOtpExpiresIn] = useState(OTP_EXPIRY_SECONDS);
  const isOtpExpired = otpExpiresIn <= 0;
  const isExpiringSoon = otpExpiresIn > 0 && otpExpiresIn <= 30;

  const { mutate: sendVerificationEmail, isPending: isSending } = useSendVerificationEmail();
  const { mutate: verifyEmail, isPending: isVerifying } = useVerifyEmail();

  useEffect(() => {
    if (!codeSent || otpExpiresIn <= 0) return;
    const timer = setInterval(() => {
      setOtpExpiresIn((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [codeSent, otpExpiresIn]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const handleSendCode = () => {
    sendVerificationEmail(undefined, {
      onSuccess: () => {
        setCodeSent(true);
        setOtpExpiresIn(OTP_EXPIRY_SECONDS);
        form.setFieldValue("otp", "");
      },
    });
  };

  const onFinish = (values: OtpFormValues) => {
    verifyEmail({ otp: values.otp });
  };

  const progressPercent = Math.max(0, (otpExpiresIn / OTP_EXPIRY_SECONDS) * 100);

  if (!codeSent) {
    return (
      <div className="my-auto h-92 rounded-lg shadow-2xl flex flex-col items-center justify-center gap-4 py-10 px-6 text-center">
        <div className="flex items-center justify-center size-14 rounded-full bg-[#018739]/10 border border-[#018739]/30">
          <MailCheck className="text-[#018739]" size={26} />
        </div>

        <Typography.Text className="text-base! dark:text-white/90! font-semibold!">
          Please verify your email
        </Typography.Text>

        <Typography.Text className="text-xs! dark:text-white/50! max-w-xs!">
          We need to confirm it&apos;s really you. Click below and we&apos;ll send a
          OTP to {user?.email ?? "your email"}.
        </Typography.Text>

        <Button
          onClick={handleSendCode}
          loading={isSending}
          size="large"
          className="bg-green-700! border-none! text-white! font-semibold! rounded-xl! h-11! px-6! hover:bg-green-800! mt-2!"
        >
          {isSending ? "Sending..." : "Send Verification Code"}
        </Button>
      </div>
    );
  }

  return (
    <div className="my-auto h-92 flex flex-col items-center justify-center gap-6 py-8 px-6 rounded-lg shadow-2xl">
      <div className="flex items-center gap-2">
        <ShieldCheck className="text-[#018739]" size={16} />
        <Typography.Text className="text-sm! dark:text-white/80! font-semibold! tracking-wide!">
          Enter Verification Code
        </Typography.Text>
      </div>

      <Typography.Text className="text-xs! dark:text-white/50! text-center!">
        OTP sent to {user?.email}
      </Typography.Text>

      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        requiredMark={false}
        validateTrigger="onSubmit"
        className="w-full! flex flex-col items-center gap-6"
        initialValues={{ otp: "" }}
      >
        <Form.Item
          name="otp"
          className="m-0! w-full! flex flex-col items-center!"
          rules={[
            {
              validator: async (_, value) => {
                const result = verifyEmailSchema.shape.otp.safeParse(value);
                if (!result.success) return Promise.reject(result.error.issues[0].message);
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input.OTP
            length={4}
            type="text"
            inputMode="numeric"
            size="large"
            disabled={isOtpExpired}
            className="w-full! max-w-64! justify-between! [&_.ant-otp-input]:size-14! [&_.ant-otp-input]:bg-[#142131]/40! [&_.ant-otp-input]:border-white/15! [&_.ant-otp-input]:text-white! [&_.ant-otp-input]:text-lg! [&_.ant-otp-input]:text-center! [&_.ant-otp-input]:font-bold! [&_.ant-otp-input]:rounded-xl! [&_.ant-otp-input]:transition-all! [&_.ant-otp-input:focus]:border-[#018739]! [&_.ant-otp-input:focus]:shadow-[0_0_0_3px_rgba(1,135,57,0.2)]!"
          />
        </Form.Item>

        <div className="w-full max-w-64 flex flex-col gap-1.5">
          <div className="h-1 w-full rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-linear ${
                isOtpExpired
                  ? "bg-red-500"
                  : isExpiringSoon
                  ? "bg-amber-500"
                  : "bg-[#018739]"
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
                className={`text-xs! ${isExpiringSoon ? "text-amber-400!" : "dark:text-white/50!"}`}
              >
                Expires in {formatTime(otpExpiresIn)}
              </Typography.Text>
            )}
          </div>
        </div>

        {isOtpExpired && (
          <Button
            type="link"
            onClick={handleSendCode}
            loading={isSending}
            className="text-xs! text-blue-400! p-0! h-auto!"
          >
            Resend code
          </Button>
        )}

        <Button
          htmlType="submit"
          loading={isVerifying}
          disabled={isOtpExpired}
          block
          size="large"
          className="bg-green-700! border-none! text-white! font-semibold! rounded-xl! h-12! hover:bg-green-800! disabled:opacity-40!"
        >
          {isVerifying ? "Verifying..." : "Verify Email"}
        </Button>
      </Form>
    </div>
  );
};

export default EmailVerification;