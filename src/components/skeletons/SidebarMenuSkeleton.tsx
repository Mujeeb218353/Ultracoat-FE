const SidebarMenuSkeleton = () => {
  const menuPlaceholders = Array.from({ length: 10 });
  return (
    <div className="flex-1 px-2 pt-4 space-y-1 bg-slate-900">
      {menuPlaceholders.map((_, i) => (
        <div
          key={i}
          className={`h-12 flex items-center justify-around px-3 ${i === 0 ? "rounded-lg bg-slate-800" : ""}`}
        >
          <div className="w-6.5 h-6.5 rounded-sm  bg-slate-700 animate-pulse shrink-0" />
          <div className="w-37 h-6.25 rounded-sm  bg-slate-700 animate-pulse" />
        </div>
      ))}
    </div>
  );
};

export default SidebarMenuSkeleton;