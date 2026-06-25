"use client";

import { Image, Typography } from "antd";
import { ShieldCheck, KeyRound, LockKeyhole } from "lucide-react";
import UltraCoatImg from "../../../public/ultra-coat-image.png";
import { usePathname } from "next/navigation";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const formTitles = {
  "login": {
    title: "SECURE LOGIN",
    icon: <ShieldCheck className="size-6 text-[#018739]" />,
  },
  "forgot-password": {
    title: "FORGOT PASSWORD",
    icon: <KeyRound className="size-6 text-[#018739]" />,
  },
  "reset-password": {
    title: "RESET PASSWORD",
    icon: <LockKeyhole className="size-6 text-[#018739]" />,
  },
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname();
  const currentPath = pathname.split("/")[2] || "login";
  const { title, icon } = formTitles[currentPath] || formTitles["login"];

  return (
    <div className="flex min-h-screen flex-col items-center relative overflow-hidden bg-linear-to-br from-[#0A1F44] via-[#0D2954] to-[#0A1F44]">
      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#FFFFFF0A_1px,transparent_1px),linear-gradient(to_bottom,#FFFFFF0A_1px,transparent_1px)] bg-size-[48px_48px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-25 -right-25 w-143 h-143 rounded-full bg-[#007A33]/10 blur-[128px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="flex flex-1 flex-col items-center justify-center w-full">
        <div className="min-w-100  flex flex-col items-center justify-center p-4">
          <div className="w-full bg-white/5 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-sm overflow-hidden">
            <div className="bg-white/10 w-full py-6 text-center flex flex-col items-center gap-4">
              <div className="p-2 bg-white/5 rounded-xl shadow-lg">
                <Image
                  src={UltraCoatImg.src}
                  alt="Ultracoat Pakistan Logo"
                  width={200}
                  preview={false}
                />
              </div>
              <div className="w-24 h-0.5 bg-linear-to-r from-transparent via-[#00c853] to-transparent" />
              <Typography.Title level={5} className="text-white/80! text-sm! font-medium!">
                Quotation Management System
              </Typography.Title>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#00c853]/50 bg-[#007A33]/10 rounded-full">
                {icon}
                <Typography.Text className="text-white/60! text-xs!">
                  {title}
                </Typography.Text>
              </div>
            </div>
            {children}
            <div className="p-4 text-center text-xs">
              <Typography.Text className="text-white/40! text-xs!">
                PSO Ultracoat Admin Portal
              </Typography.Text>
            </div>
          </div>
        </div>
      </div>

      <p className="mb-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} PSO Ultracoat Marketing. All rights reserved.
      </p>
    </div>
  );
}