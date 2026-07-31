"use client";

import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useQuotesPerRepresentative } from "../selectors/dashboard.selector";
import { useThemeMode } from "@/features/theme/selector/theme.selector";

const QuotesPerRepresentativeChart = () => {
  const quotesPerRepresentative = useQuotesPerRepresentative();
  const mode = useThemeMode();
  const isDark = mode === "dark";
  return (
    <Card className="shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <h3 className="font-semibold text-[#001259] dark:text-white mb-4">
        Quotes per Representative
      </h3>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={quotesPerRepresentative}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
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
          <Bar dataKey="count" fill="#001259" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default QuotesPerRepresentativeChart;