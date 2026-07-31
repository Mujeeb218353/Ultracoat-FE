"use client";

import { Card } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRecentActivity } from "../selectors/dashboard.selector";

dayjs.extend(relativeTime);

const STATUS_COLORS: Record<string, string> = {
  "Quotation Pending": "bg-amber-500",
  "Quotation Approved": "bg-[#007A33]",
  "Quotation Rejected": "bg-red-500",
  "Quotation Re-quoted": "bg-blue-500",
};

const getStatusColor = (statusLabel: string) => STATUS_COLORS[statusLabel] ?? "bg-gray-400";

const RecentActivityCard = () => {
  const activities = useRecentActivity();

  if (!activities?.length) return null;

  return (
    <Card className="shadow-sm border-gray-100 dark:border-white/10 dark:bg-[#0d1b3e]">
      <h3 className="font-semibold text-[#001259] dark:text-white mb-4">Recent Activity</h3>

      <div className="flex flex-col">
        {activities.map((activity, index) => (
          <div
            key={activity.id}
            className={`flex items-start justify-between gap-4 py-3 ${
              index !== activities.length - 1
                ? "border-b border-gray-100 dark:border-white/10"
                : ""
            }`}
          >
            <div className="flex items-start gap-3">
              <span
                className={`mt-1.5 size-2 rounded-full shrink-0 ${getStatusColor(activity.statusLabel)}`}
              />
              <div>
                <p className="text-sm font-semibold text-[#0F172A] dark:text-white">
                  {activity.statusLabel}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {activity.company} · {activity.contactPerson}
                </p>
              </div>
            </div>

            <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap shrink-0">
              {dayjs(activity.createdAt).fromNow()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentActivityCard;