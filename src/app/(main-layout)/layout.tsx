"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useUser, useIsAuthenticated, useHasHydrated } from "@/features/auth/selectors/auth.selector";
import { Layout } from "antd";
import { useEffect, useRef, useState } from "react";
import EmailVerification from "@/features/auth/components/EmailVerification";
import LogoutModal from "@/features/auth/components/LogoutModal";
import { useRouter, usePathname } from "next/navigation";

const { Content } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const user = useUser();
  const isAuthenticated = useIsAuthenticated();
  const hasHydrated = useHasHydrated();

  const pathname = usePathname();
  const router = useRouter();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  useEffect(() => {
    if (!hasHydrated) return;

    if (!isAuthenticated && !pathname.includes("/auth")) {
      router.push("/auth/login");
    }
  }, [hasHydrated, isAuthenticated, router, pathname]);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {

    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        isMobile &&
        !collapsed &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)
      ) {
        setCollapsed(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobile, collapsed]);

  if (!hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="flex flex-col h-screen w-full">
      <Layout hasSider className="w-full! h-full! overflow-x-hidden">
        <Sidebar
          sidebarRef={sidebarRef}
          collapsed={collapsed}
          isMobile={isMobile}
          setIsLogoutModalOpen={setIsLogoutModalOpen}
        />
        <Layout className="w-full! min-h-max flex flex-col overflow-x-scroll">
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            toggleBtnRef={toggleBtnRef}
            isMobile={isMobile}
            user={{
              name: user?.name || "Guest User",
              role: user?.role || "Guest",
            }}
          />
          <Content className="flex-1 flex flex-col overflow-y-scroll overflow-x-hidden">
            <div className="flex-1 flex flex-col pt-18">
              {user && !user.isVerified ? (
                <EmailVerification />
              ) : (
                <div>{children}</div>
              )}
            </div>
          </Content>
        </Layout>
        <LogoutModal
          isVisible={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
        />
      </Layout>
    </div>
  );
};

export default MainLayout;