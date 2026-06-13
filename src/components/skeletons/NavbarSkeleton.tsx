const NavbarSkeleton = ({
  collapsed,
  isMobile,
}: {
  collapsed: boolean;
  isMobile: boolean;
}) => {
  return (
    <header
      className="h-18! px-4! flex! justify-between! items-center! fixed! top-0! z-100! overflow-hidden! bg-white! dark:bg-slate-900! border-b! border-gray-200! dark:border-slate-700! shadow-sm! dark:shadow-slate-950/40!"
      style={{
        width: isMobile ? "100%" : collapsed ? "calc(100% - 4rem)" : "calc(100% - 15rem)",
        right: 0,
      }}
    >
      <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-slate-700 animate-pulse" />
      <div className="flex items-center gap-4 ml-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse shrink-0" />
          <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 animate-pulse shrink-0" />
          {!isMobile && (
            <div className="flex flex-col gap-1">
              <div className="w-18.75 h-3.25 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
              <div className="w-11.25 h-2.5 rounded bg-gray-200 dark:bg-slate-700 animate-pulse" />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default NavbarSkeleton;