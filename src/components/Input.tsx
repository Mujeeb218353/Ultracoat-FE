"use client";

import { Input } from "antd";
import type { InputProps } from "antd";
import type { ChangeEvent } from "react";

export type FieldType = "text" | "email" | "password" | "number" | "textarea" | "otp";

export interface FormInputProps extends Omit<InputProps, "prefix" | "size" | "onChange"> {
  type?: FieldType;
  icon?: React.ReactNode;
  size?: "small" | "medium" | "large";
  otpLength?: number;
  value?: string;
  onChange?: (value: string) => void;
}

const otpClassName =
  "w-full! max-w-64! justify-between! [&_.ant-otp-input]:size-14! [&_.ant-otp-input]:bg-[#142131]/40! [&_.ant-otp-input]:border-white/15! [&_.ant-otp-input]:text-white! [&_.ant-otp-input]:text-lg! [&_.ant-otp-input]:text-center! [&_.ant-otp-input]:font-bold! [&_.ant-otp-input]:rounded-xl! [&_.ant-otp-input]:transition-all! [&_.ant-otp-input:focus]:border-[#018739]! [&_.ant-otp-input:focus]:shadow-[0_0_0_3px_rgba(1,135,57,0.2)]!";

const FormInput = ({
  type = "text",
  icon,
  size = "medium",
  otpLength = 4,
  className,
  value,
  onChange,
  ...inputProps
}: FormInputProps) => {
  if (type === "otp") {
    return (
      <Input.OTP
        length={otpLength}
        type="text"
        inputMode="numeric"
        size={size === "medium" ? "large" : size}
        disabled={inputProps.disabled}
        value={value}
        onChange={onChange}
        className={`${otpClassName} ${className ?? ""}`}
      />
    );
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const commonProps = {
    size: size as InputProps["size"],
    prefix: icon,
    className: `${className ?? ""}`,
    value,
    onChange: handleChange,
    ...inputProps,
  };

  if (type === "password") {
    return <Input.Password {...commonProps} />;
  }

  if (type === "textarea") {
    return (
      <Input.TextArea
        {...(commonProps as React.ComponentProps<typeof Input.TextArea>)}
        rows={4}
      />
    );
  }

  return <Input {...commonProps} type={type === "number" ? "number" : "text"} />;
};

export default FormInput;