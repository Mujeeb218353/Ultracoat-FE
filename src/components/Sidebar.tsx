"use client";

import { Layout, Menu } from "antd";
import UltraCoatImg from "../../public/ultra-coat-image.png";
import { Image } from "antd";
import { usePathname } from "next/navigation";
import ROLE_CONFIG from "@/config/RoleConfig";
import getSelectedMenuKeys from "@/config/getSelectedMenuKeys";
import BuildMenuItems from "@/utils/BuildMenu";
import { useUser, useHasHydrated } from "@/features/auth/selectors/auth.selector";
import SidebarMenuSkeleton from "./skeletons/SidebarMenuSkeleton";

const { Sider } = Layout;

interface SidebarProps {
  sidebarRef: React.RefObject<HTMLDivElement | null>;
  collapsed: boolean;
  isMobile: boolean;
}

const Sidebar = ({ sidebarRef, collapsed, isMobile }: SidebarProps) => {
  const user = useUser();
  const location = usePathname();
  const hasHydrated = useHasHydrated();

  const roleKey = user?.role?.toLowerCase();
  const roleConfig = roleKey ? ROLE_CONFIG[roleKey] : null;
  const menuItems = BuildMenuItems(roleConfig, collapsed);

  return (
    <Sider
      theme={"dark"}
      ref={sidebarRef}
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={"15rem"}
      breakpoint="md"
      collapsedWidth={isMobile ? "0" : "4rem"}
      style={{
        height: "100vh",
        overflow: "hidden",
        position: isMobile ? "fixed" : "sticky",
        insetInlineStart: 0,
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 101,
      }}
    >
      <div className="flex h-full flex-col">
        <div className="w-full p-6 flex justify-center items-center">
          <Image
            src={UltraCoatImg.src}
            alt="Ultracoat Pakistan Logo"
            width={"100%"}
            preview={false}
          />
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden pb-4">
          {hasHydrated ? (
            <Menu
              mode="inline"
              theme="dark"
              items={roleKey && roleConfig ? menuItems : []}
              selectedKeys={getSelectedMenuKeys(location)}
              className="w-full! border-none!"
            />
          ) : (
            <SidebarMenuSkeleton />
          )}
        </div>

        <div
          className={`shrink-0 text-xs flex justify-center items-center text-gray-500 gap-1 py-6 ${collapsed ? "hidden" : ""}`}
        >
          <span>Designed & developed by </span>
          <a
            className="text-[#084C92] font-semibold"
            href="https://qbsco.net/"
            target="_blank"
            rel="noopener noreferrer"
          >
            QBS Co.
          </a>
        </div>
      </div>
    </Sider>
  );
};

export default Sidebar;