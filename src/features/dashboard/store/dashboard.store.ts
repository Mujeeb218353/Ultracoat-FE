import { create } from "zustand";
import { DashboardState } from "../types/dashboard.types";

const useDashboardStore = create<DashboardState>()((set) => ({
  dashboard: null,
  setDashboard: (dashboard) => set({ dashboard }),
  clearDashboard: () => set({ dashboard: null }),
}));

export default useDashboardStore;