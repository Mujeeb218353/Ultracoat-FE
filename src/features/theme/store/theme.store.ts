import { create } from "zustand";
import Cookies from "js-cookie";

export type ThemeMode = "light" | "dark";

export const THEME_COOKIE = "theme";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

export function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  return Cookies.get(THEME_COOKIE) === "dark" ? "dark" : "light";
}

function writeStoredTheme(mode: ThemeMode) {
  Cookies.set(THEME_COOKIE, mode, { expires: 365, sameSite: "lax", path: "/" });
}

const useThemeStore = create<ThemeState>((set) => ({
  mode: readStoredTheme(),

  toggleTheme: () =>
    set((state) => {
      const next: ThemeMode = state.mode === "light" ? "dark" : "light";
      writeStoredTheme(next);
      return { mode: next };
    }),

  setTheme: (mode) => {
    writeStoredTheme(mode);
    set({ mode });
  },
}));

export default useThemeStore;
