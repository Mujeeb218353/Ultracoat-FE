interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
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
        {children}
      </div>

      <p className="mb-4 text-center text-xs text-gray-400">
        © {new Date().getFullYear()} PSO Ultracoat Marketing. All rights reserved.
      </p>
    </div>
  );
}