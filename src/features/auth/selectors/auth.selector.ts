import useAuthStore from "../store/auth.store";

export const useUser = () => useAuthStore((s) => s.user);
export const useIsAuthenticated = () => useAuthStore((s) => s.isAuthenticated);
export const useHasHydrated = () => useAuthStore((s) => s.hasHydrated);

export const usePatchUser = () => useAuthStore((s) => s.patchUser);
export const useSetUser = () => useAuthStore((s) => s.setUser);
export const useSetTokens = () => useAuthStore((s) => s.setTokens);
export const useClearAuth = () => useAuthStore((s) => s.clearAuth);
export const useSetHasHydrated = () => useAuthStore((s) => s.setHasHydrated);