import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import Cookies from "js-cookie";
import { AuthState } from "../types/auth.types";

const COOKIE_OPTS = { 
  secure: true, 
  sameSite: "strict" as const 
};

function writeTokenCookies(accessToken: string | null, refreshToken: string | null) {
  if (accessToken) {
    Cookies.set("accessToken", accessToken, { ...COOKIE_OPTS, expires: 1 });
  } else {
    Cookies.remove("accessToken");
  }
  if (refreshToken) {
    Cookies.set("refreshToken", refreshToken, { ...COOKIE_OPTS, expires: 7 });
  } else {
    Cookies.remove("refreshToken");
  }
}

const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      theme: "light",
      hasHydrated: false,

      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
      setTokens: (accessToken, refreshToken) => {
        writeTokenCookies(accessToken, refreshToken);
        set({ isAuthenticated: Boolean(accessToken) });
      },
      setTheme: (theme) => set({ theme }),
      clearAuth: () => {
        writeTokenCookies(null, null);
        set({ user: null, isAuthenticated: false });
      },
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        theme: state.theme,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;