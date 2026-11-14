import { useHasHydrated } from "@/features/auth/selectors/auth.selector";
import { useThemeMode } from "@/features/theme/selector/theme.selector";
import { Avatar, Badge, Button, Layout } from "antd";
import { Bell, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import useNotifications from "@/features/notification/hooks/use-notifications";
import NavbarSkeleton from "./skeletons/NavbarSkeleton";
import ThemeToggle from "./ThemeToggler";
const { Header } = Layout;

interface NavbarProps {
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBtnRef: React.RefObject<HTMLButtonElement | null>;
  isMobile: boolean;
  user: {
    name: string;
    role: string;
  };
}

const Navbar = ({ collapsed, setCollapsed, toggleBtnRef, isMobile, user }: NavbarProps) => {
  const hasHydrated = useHasHydrated();
  const mode = useThemeMode();
  const { data: notifications } = useNotifications(0, 10, true);
  const headerBackground = mode === "light" ? "#ffffff" : "#222222";

  if (!hasHydrated) {
    return <NavbarSkeleton collapsed={collapsed} isMobile={isMobile} />;
  }

  return (
    <Header
      className="h-18! px-4! flex! justify-between! items-center! fixed! top-0! z-100! overflow-hidden! shadow-sm! border-b border-0.5 border-gray-200 dark:border-white/10"
      style={{
        width: isMobile ? "100%" : collapsed ? "calc(100% - 4rem)" : "calc(100% - 15rem)",
        right: 0,
        backgroundColor: headerBackground,
      }}
    >
      <Button
        className="p-1! h-8! w-8! rounded-lg! transition-all! duration-500! ease-in-out! border-none! bg-white! hover:bg-gray-100! dark:bg-zinc-800! dark:hover:bg-zinc-700! text-black! dark:text-white!"
        ref={toggleBtnRef}
        onClick={(event) => {
          event.stopPropagation();
          setCollapsed((prev) => !prev);
        }}
        icon={collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      />
      <div className="flex justify-center items-center gap-4 ml-4">
        <div className="flex items-center gap-2 cursor-pointer mt-4">
        <Link href="/notifications" aria-label="Notifications">
          <Badge count={notifications?.unreadCount} size="small" className="flex! justify-center! items-center!">
            <Button type="text" aria-label="Open notifications" className="p-1! h-8! w-8! rounded-full! transition-all! duration-500! ease-in-out! border-none! bg-white! hover:bg-gray-100! dark:bg-zinc-900! dark:hover:bg-zinc-800! text-black! dark:text-white!" icon={<Bell size={20} />} />
          </Badge>
        </Link>
          <ThemeToggle />
          <Avatar
            size={30}
            className="bg-[#004085]! text-white! font-semibold! text-lg! truncate!"
          >
            {user.name[0] + (user.name.split(" ")[1] ? user.name.split(" ")[1][0] : "")}
          </Avatar>

          {!isMobile && (
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold truncate text-slate-900 dark:text-slate-100" title={user.name}>
                {user.name}
              </span>
              <span className="text-xs truncate text-slate-500 dark:text-slate-300" title={user.role}>
                {user.role}
              </span>
            </div>
          )}
        </div>
      </div>
    </Header>
  );
};

export default Navbar;