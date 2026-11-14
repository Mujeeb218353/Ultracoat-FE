"use client";

import PageHeader from "@/components/PageHeader";
import NotificationsList from "@/features/notification/components/NotificationsList";

const NotificationsPage = () => (
  <div className="flex-1 flex flex-col">
    <PageHeader />
    <NotificationsList />
  </div>
);

export default NotificationsPage;