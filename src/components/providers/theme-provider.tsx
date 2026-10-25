"use client";

import { useEffect } from "react";
import { useThemeMode } from "@/features/theme/selector/theme.selector";
import { ConfigProvider } from "antd";
import getAntdTheme from "@/config/antd-theme";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useThemeMode();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return <ConfigProvider theme={getAntdTheme(mode)}>{children}</ConfigProvider>;
};

export default ThemeProvider;
