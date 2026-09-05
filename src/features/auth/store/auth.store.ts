import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { AuthState } from "../types/auth.types";

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      hasHydrated: false,

      patchUser: (partial) => {
        const currentUser = get().user;
        if (!currentUser) return;
        set({ user: { ...currentUser, ...partial } });
      },

      setUser: (user) => set({ user, isAuthenticated: Boolean(user) }),
      setIsAuthenticated: (accessToken, refreshToken) =>  set({ isAuthenticated: Boolean(accessToken) || Boolean(refreshToken) }),
      clearAuth: () => set({ user: null, isAuthenticated: false }),
      setHasHydrated: (state) => set({ hasHydrated: state }),
    }),
    {
      name: "auth-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useAuthStore;