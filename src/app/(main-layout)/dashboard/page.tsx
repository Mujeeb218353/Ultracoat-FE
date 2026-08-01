
import StatCardsGrid from "@/features/dashboard/components/StatCardsGrid";
import QuotesPerRepresentativeChart from "@/features/dashboard/components/QuotesPerRepresentativeChart";
import MonthlyJobsCompletedChart from "@/features/dashboard/components/MonthlyJobsCompletedChart";
import CustomerRatingsDistributionChart from "@/features/dashboard/components/CustomerRatingsDistributionChart";
import RecentActivityCard from "@/features/dashboard/components/RecentActivityCard";
import CustomerRatingsBarChart from "@/features/dashboard/components/CustomerRatingsBarChart";

export default function DashboardPage() {

  return (
    <div className="space-y-6">
      <StatCardsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuotesPerRepresentativeChart />
        <MonthlyJobsCompletedChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CustomerRatingsDistributionChart />
        <CustomerRatingsBarChart />
      </div>
        <RecentActivityCard />
    </div>
  );
}