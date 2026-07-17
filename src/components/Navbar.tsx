import { useHasHydrated } from "@/features/auth/selectors/auth.selector";
import { useThemeMode } from "@/features/theme/selector/theme.selector";
import { Avatar, Button, Layout } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
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
  const headerBackground = mode === "light" ? "#ffffff" : "#222222";

  if (!hasHydrated) {
    return <NavbarSkeleton collapsed={collapsed} isMobile={isMobile} />;
  }

  return (
    <Header
      className="h-18! px-4! flex! justify-between! items-center! fixed! top-0! z-100! overflow-hidden! shadow-sm!"
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
      <div className="flex justify-around items-center gap-4 ml-4">
        <div className="flex items-center gap-2 cursor-pointer">
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