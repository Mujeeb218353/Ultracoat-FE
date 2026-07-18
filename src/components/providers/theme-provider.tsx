"use client";

import { useEffect } from "react";
import { useThemeMode } from "@/features/theme/selector/theme.selector";
import { ConfigProvider } from "antd";
import getAntdTheme from "@/config/antd-theme";

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const mode = useThemeMode();

  useEffect(() => {
    const root = document.documentElement;
    if (mode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [mode]);

  return <ConfigProvider theme={getAntdTheme(mode)}>{children}</ConfigProvider>;
};

export default ThemeProvider;