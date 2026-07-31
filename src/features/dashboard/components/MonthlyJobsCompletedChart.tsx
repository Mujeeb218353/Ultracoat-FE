"use client";

import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useMonthlyJobsCompleted } from "../selectors/dashboard.selector";
import { useThemeMode } from "@/features/theme/selector/theme.selector";

const MonthlyJobsCompletedChart = () => {
  const monthlyJobsCompleted = useMonthlyJobsCompleted();
  const mode = useThemeMode();
  const isDark = mode === "dark";
  return (
    <Card className="shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <h3 className="font-semibold text-[#001259] dark:text-white mb-4">
        Monthly Jobs Completed
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <LineChart 
          data={monthlyJobsCompleted}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
           <Tooltip
            contentStyle={{
              backgroundColor: isDark ? "#111827" : "#ffffff",
              border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
              borderRadius: 8,
              color: isDark ? "#f3f4f6" : "#111827",
            }}
            labelStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
            itemStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
            cursor={false}
          />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#007A33"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#007A33" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default MonthlyJobsCompletedChart;