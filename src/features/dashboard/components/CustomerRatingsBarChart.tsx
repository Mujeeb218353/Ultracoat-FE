"use client";

import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useCustomerRatingsDistribution } from "../selectors/dashboard.selector";
import { useThemeMode } from "@/features/theme/selector/theme.selector";

const COLORS: Record<number, string> = {
  5: "#007A33",
  4: "#2E9E4F",
  3: "#5CB86E",
  2: "#8AD08D",
  1: "#B8E8AC",
};

const CustomerRatingsBarChart = () => {
  const customerRatingsDistribution = useCustomerRatingsDistribution();
  const mode = useThemeMode();
  const isDark = mode === "dark";

  if (!customerRatingsDistribution?.length) return null;

  const chartData = customerRatingsDistribution
    .map((item) => ({
      label: `${item.stars} Star${item.stars > 1 ? "s" : ""}`,
      count: item.count,
      percent: item.percent,
      fill: COLORS[item.stars] ?? "#d1d5db",
    }))
    .sort((a, b) => {
      const order = ["5 Stars", "4 Stars", "3 Stars", "2 Stars", "1 Star"];
      return order.indexOf(a.label) - order.indexOf(b.label);
    });

  const axisColor = isDark ? "#cbd5e1" : "#6b7280";
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0";

  return (
    <Card className="shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <h3 className="font-semibold text-[#001259] dark:text-white mb-4">
        Customer Ratings Distribution
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData} margin={{ top: 10 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis
            type="category"
            dataKey="label"
            tick={{ fontSize: 12, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="number"
            tick={{ fontSize: 12, fill: axisColor }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: 8,
              color: isDark ? "#f3f4f6" : "#111827",
            }}
            labelStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
            itemStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
            formatter={(value, _name, entry) => {
              const payload = entry?.payload as { percent?: number; label?: string } | undefined;
              return [`${value} reviews (${payload?.percent ?? 0}%)`, payload?.label ?? ""];
            }}
            cursor={{ fill: isDark ? "rgba(255,255,255,0.05)" : "#f5f5f5" }}
          />
          <Bar dataKey="count" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomerRatingsBarChart;