export interface QuotesPerRepresentative {
  name: string;
  count: number;
};

export interface MonthlyJobsCompleted {
  month: string;
  count: number;
};

export interface CustomerRatingsDistribution {
  stars: number;
  count: number;
  percent: number;
};

export interface Charts {
  monthlyJobsCompleted: MonthlyJobsCompleted[];
  quotesPerRepresentative: QuotesPerRepresentative[];
  customerRatingsDistribution: CustomerRatingsDistribution[];
};

export interface KPIs {
  totalRepresentatives: number;
  customers: number;
  pendingQuotations: number;
  completedJobs: number;
};

export interface RecentActivity {
  id: string;
  company: string;
  contactPerson: string;
  statusLabel: string;
  createdAt: string;
};

export interface Dashboard {
  kpis: KPIs;
  charts: Charts;
  recentActivity: RecentActivity[];
};

export interface DashboardState {
  dashboard: Dashboard | null;
  setDashboard: (dashboard: Dashboard) => void;
  clearDashboard: () => void;
}