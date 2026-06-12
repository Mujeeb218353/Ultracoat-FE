import useThemeStore from "../store/theme.store";

export const useThemeMode = () => useThemeStore((s) => s.mode);
export const useToggleTheme = () => useThemeStore((s) => s.toggleTheme);
export const useSetTheme = () => useThemeStore((s) => s.setTheme);