"use client";

import { Sun, Moon } from "lucide-react";
import { useThemeMode, useToggleTheme } from "@/features/theme/selector/theme.selector";
import { Button } from "antd";

const ThemeToggle = () => {
  const mode = useThemeMode();
  const toggleTheme = useToggleTheme();

  return (
    <Button
      onClick={toggleTheme}
      className="p-1.5! rounded-full! transition-all! duration-500! ease-in-out! border-none! bg-white! hover:bg-gray-200! dark:bg-zinc-900! dark:hover:bg-zinc-800! text-black! dark:text-white!"
      aria-label="Toggle theme"
    >
      {mode === "dark" ? <Sun className="text-yellow-500" size={20} /> : <Moon className="text-gray-500" size={20} />}
    </Button>
  );
};

export default ThemeToggle;