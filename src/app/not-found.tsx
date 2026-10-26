import { ArrowRight } from "lucide-react";
import Link from "next/link";

const NotFound = () => {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fafc] px-6 py-16 text-[#0a1f44] dark:bg-[#171717] dark:text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-[#018739]/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-32 size-96 rounded-full bg-[#084c92]/10 blur-3xl"
      />

      <section className="relative flex w-full max-w-xl flex-col items-center text-center">
        <p className="font-mono text-8xl font-bold tracking-tight text-[#084c92] sm:text-9xl">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-md text-base leading-7 text-slate-600 dark:text-slate-400">
          We couldn&apos;t find the page you were looking for. It may have moved
          or the address may be incorrect.
        </p>

        <Link
          href="/dashboard"
          className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#018739] px-6 py-3 font-medium text-white shadow-lg shadow-[#018739]/20 transition-colors hover:bg-[#007a33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#018739]"
        >
          Back to dashboard
          <ArrowRight aria-hidden="true" size={18} />
        </Link>

        <p className="mt-12 text-sm text-slate-500 dark:text-slate-500">
          UltraCoat Pakistan · Admin Portal
        </p>
      </section>
    </main>
  );
};

export default NotFound;