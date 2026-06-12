import { create } from "zustand";

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  toggleTheme: () => void;
  setTheme: (mode: ThemeMode) => void;
}

function readStoredTheme(): ThemeMode {
  if (typeof window === "undefined") return "light";
  const stored = localStorage.getItem("theme");
  return stored === "dark" ? "dark" : "light";
}

function writeStoredTheme(mode: ThemeMode) {
  localStorage.setItem("theme", mode);
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