import useDashboardStore from "../store/dashboard.store";

export const useKPIs = () => useDashboardStore((state) => state.dashboard?.kpis);

export const useCustomerRatingsDistribution = () => useDashboardStore((state) => state.dashboard?.charts.customerRatingsDistribution);
export const useMonthlyJobsCompleted = () => useDashboardStore((state) => state.dashboard?.charts.monthlyJobsCompleted);
export const useQuotesPerRepresentative = () => useDashboardStore((state) => state.dashboard?.charts.quotesPerRepresentative);

export const useRecentActivity = () => useDashboardStore((state) => state.dashboard?.recentActivity);

export const useSetDashboard = () => useDashboardStore((state) => state.setDashboard);