"use client";

import { useSyncExternalStore } from "react";
import useThemeStore, { ThemeMode } from "../store/theme.store";

export const useThemeMode = (): ThemeMode =>
  useSyncExternalStore(
    useThemeStore.subscribe,
    () => useThemeStore.getState().mode,
    () => "light",
  );
export const useToggleTheme = () => useThemeStore((s) => s.toggleTheme);
export const useSetTheme = () => useThemeStore((s) => s.setTheme);
