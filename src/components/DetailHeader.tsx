import { ReactNode } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface DetailHeaderProps {
  backHref: string;
  title: ReactNode;
  subtitle?: ReactNode;
  titleExtra?: ReactNode;
  actions?: ReactNode;
}

const DetailHeader = ({ backHref, title, subtitle, titleExtra, actions }: DetailHeaderProps) => {
  const router = useRouter();

  return (
    <header className="sticky top-18 z-10 flex flex-col items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-3 dark:border-white/10 dark:bg-[#222222] sm:flex-row">
      <div className="flex items-center gap-4">
        <button
          type="button"
          className="flex cursor-pointer items-center gap-2 border-r border-gray-200 pr-3 text-gray-500 hover:text-gray-700 dark:border-white/10 dark:text-gray-400 dark:hover:text-gray-200"
          onClick={() => router.push(backHref)}
        >
          <ArrowLeft size={14} />
          Back
        </button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-bold">{title}</h1>
            {titleExtra}
          </div>
          {subtitle && <p className="text-xs text-gray-400">{subtitle}</p>}
        </div>
      </div>
      {actions}
    </header>
  );
};

export default DetailHeader;
