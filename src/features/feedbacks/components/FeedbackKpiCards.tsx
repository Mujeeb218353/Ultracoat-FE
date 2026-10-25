"use client";

import { Card, Skeleton } from "antd";
import { Star, MessageSquare, ThumbsUp, User } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "@/features/dashboard/components/StatCard";
import { useThemeMode } from "@/features/theme/selector/theme.selector";
import { FeedbacksResponse } from "../types/feedback.types";

interface FeedbackKpiCardsProps {
  statistics?: FeedbacksResponse["statistics"];
  total?: number;
  loading?: boolean;
}

const cardClass = "shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]";

const FeedbackKpiCards = ({ statistics, total, loading }: FeedbackKpiCardsProps) => {
  const isDark = useThemeMode() === "dark";
  const axisColor = isDark ? "#cbd5e1" : "#6b7280";
  const gridColor = isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0";

  if (loading && !statistics) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}><Skeleton active paragraph={{ rows: 2 }} /></Card>
        ))}
      </div>
    );
  }

  if (!statistics) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={<Star size={20} />}
          label="Average Rating"
          value={statistics.averageRating.toFixed(1)}
          change={statistics.averageRatingChange}
        />
        <StatCard
          icon={<MessageSquare size={20} />}
          label="Total Feedback"
          value={total ?? 0}
          change={statistics.totalFeedbackChangePercent}
          changeSuffix="%"
          changeLabel="this month"
        />
        <StatCard
          icon={<ThumbsUp size={20} />}
          label="Positive Sentiment"
          value={`${statistics.positiveSentimentPercent}%`}
          change={statistics.positiveSentimentChange}
          changeSuffix="%"
          changeLabel="this month"
        />
        <StatCard
          icon={<User size={20} />}
          label="Active Representatives"
          value={statistics.activeRepresentatives}
          footer="Across all regions"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Card size="small" className={cardClass}>
          <h3 className="mb-2 text-sm font-semibold text-[#001259] dark:text-white">Customer Satisfaction Trend</h3>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={statistics.satisfactionTrend} margin={{ top: 10, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
              <YAxis domain={[0, 5]} tick={{ fontSize: 11, fill: axisColor }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#111827" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: 8,
                  color: isDark ? "#f3f4f6" : "#111827",
                }}
                labelStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
                itemStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
              />
              <Line
                type="monotone"
                dataKey="avgRating"
                name="Avg Rating"
                stroke="#007A33"
                strokeWidth={2}
                dot={{ r: 3, fill: "#007A33" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card size="small" className={cardClass}>
          <h3 className="mb-2 text-sm font-semibold text-[#001259] dark:text-white">Feedback by Category</h3>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={statistics.feedbackByCategory} outerRadius="75%">
              <PolarGrid stroke={gridColor} />
              <PolarAngleAxis dataKey="category" tick={{ fontSize: 11, fill: axisColor }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#111827" : "#ffffff",
                  border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                  borderRadius: 8,
                  color: isDark ? "#f3f4f6" : "#111827",
                }}
                itemStyle={{ color: isDark ? "#f3f4f6" : "#111827" }}
              />
              <Radar dataKey="value" name="Rating" stroke="#001259" fill="#001259" fillOpacity={0.55} />
            </RadarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default FeedbackKpiCards;
