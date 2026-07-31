"use client";

import { Card } from "antd";
import { PieChart, Pie, Tooltip, ResponsiveContainer } from "recharts";
import { useCustomerRatingsDistribution } from "../selectors/dashboard.selector";
import { useThemeMode } from "@/features/theme/selector/theme.selector";

const COLORS: Record<number, string> = {
  5: "#007A33",
  4: "#001259",
  3: "#94a3b8",
  2: "#cbd5e1",
  1: "#e2e8f0",
  0: "#d1d5db",
};

const CustomerRatingsDistributionChart = () => {
  const customerRatingsDistribution = useCustomerRatingsDistribution();
  const mode = useThemeMode();
  const isDark = mode === "dark";

  if (!customerRatingsDistribution?.length) return null;

  const textColor = isDark ? "#ffffff" : "#000000";

  const chartData = customerRatingsDistribution
    .map((item) => {
      const stars = item.stars ?? 0;
      return {
        ...item,
        stars,
        label: stars === 0 ? "Unrated" : `${stars} Star${stars > 1 ? "s" : ""}`,
        count: item.count,
        percent: item.percent,
        fill: COLORS[stars] ?? "#94A3B8",
      };
    })
    .sort((a, b) => b.stars - a.stars);

  return (
    <Card className="shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <h3 className="font-semibold text-[#001259] dark:text-white mb-4">
        Customer Ratings Distribution
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="percent"
            nameKey="label"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            stroke={isDark ? "#0d1b3e" : "#ffffff"}
            strokeWidth={2}
            label={({ payload, x, y, textAnchor }) => (
              <text
                x={x}
                y={y}
                fill={textColor}
                textAnchor={textAnchor}
                dominantBaseline="central"
                fontSize={12}
                fontWeight={600}
              >
                {payload.stars === 0 ? `Unrated: ${payload.percent}%` : `${payload.stars} Star${payload.stars > 1 ? "s" : ""}: ${payload.percent}%`}
              </text>
            )}
            labelLine={false}
            fill={isDark ? "#f3f4f6" : "#111827"}
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
              const payload = entry?.payload as { percent?: number; label?: string, stars?: number } | undefined;
              return [`${value} reviews (${payload?.percent ?? 0}%)`, payload?.label ?? ""];
            }}
            cursor={false}
          />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CustomerRatingsDistributionChart;