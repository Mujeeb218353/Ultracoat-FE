"use client";

import { Users, User, FileText, CheckCircle2 } from "lucide-react";
import StatCard from "./StatCard";
import { useKPIs } from "../selectors/dashboard.selector";

const StatCardsGrid = () => {
  const kpis = useKPIs();

  if (!kpis) return null;

  const stats = [
    {
      label: "Total Representatives",
      value: kpis.totalRepresentatives,
      icon: Users,
    },
    {
      label: "Active Customers",
      value: kpis.customers,
      icon: User,
    },
    {
      label: "Pending Quotations",
      value: kpis.pendingQuotations,
      icon: FileText,
    },
    {
      label: "Completed Jobs",
      value: kpis.completedJobs,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map(({ label, value, icon: Icon }) => (
        <StatCard key={label} icon={<Icon size={20} />} value={value} label={label} />
      ))}
    </div>
  );
};

export default StatCardsGrid;