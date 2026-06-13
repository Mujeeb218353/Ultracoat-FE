"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useUser } from "@/features/auth/selectors/auth.selector";
import { Layout } from "antd";
import { useEffect, useRef, useState } from "react";

const { Content } = Layout;

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  const user = useUser();

  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [collapsed, setCollapsed] = useState<boolean>(true);

  
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

  return (
    <div className="flex flex-col h-screen w-full">
      <Layout hasSider className="w-full! h-full! overflow-x-hidden">
        <Sidebar 
          sidebarRef={sidebarRef} 
          collapsed={collapsed} 
          isMobile={isMobile} 
        />
        <Layout className="w-full! min-h-max flex flex-col overflow-x-scroll">
          <Navbar
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            toggleBtnRef={toggleBtnRef}
            isMobile={isMobile}
            user={user}
          />
          <Content className="flex-1 flex flex-col overflow-y-scroll">
            <div className="flex-1 flex justify-center pt-18 bg-white dark:bg-[#141414] text-black dark:text-white">
              {children}
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  )
};

export default MainLayout;