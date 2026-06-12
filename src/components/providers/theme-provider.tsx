"use client";

import { useEffect } from "react";
import { useThemeMode } from "@/features/theme/selector/theme.selector";

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

  return <>{children}</>;
};

export default ThemeProvider;