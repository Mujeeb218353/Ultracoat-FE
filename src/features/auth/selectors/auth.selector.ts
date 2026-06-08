import useAuthStore from "../store/auth.store";

export const useUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useTheme = () => useAuthStore((s) => s.theme);
export const useHasHydrated = () => useAuthStore((s) => s.hasHydrated);