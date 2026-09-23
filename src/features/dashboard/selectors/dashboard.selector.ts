import { Dashboard } from "../types/dashboard.types";
import useDashboardQuery from "../hooks/use-dashboard";

export const useDashboard = () => useDashboardQuery().data;

export const useKPIs = () => useDashboardQuery().data?.kpis;

export const useMonthlyJobsCompleted = () => useDashboardQuery().data?.charts.monthlyJobsCompleted;

export const useQuotesPerRepresentative = () => useDashboardQuery().data?.charts.quotesPerRepresentative;

export const useCustomerRatingsDistribution = () => useDashboardQuery().data?.charts.customerRatingsDistribution;

export const useRecentActivity = () => useDashboardQuery().data?.recentActivity;

export const useDashboardData = () => useDashboardQuery().data as Dashboard | undefined;