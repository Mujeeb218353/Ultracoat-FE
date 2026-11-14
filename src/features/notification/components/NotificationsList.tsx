"use client";

import { Alert, Button, Card, Empty, Listy, Pagination, Space, Spin, Tag } from "antd";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useAlert from "@/features/alert/hooks/use-alert";
import type { UserNotification } from "../types/notification.types";
import useMarkNotificationsRead from "../hooks/use-mark-notifications-read";
import useNotifications from "../hooks/use-notifications";

const PAGE_SIZE = 10;

const NotificationsList = () => {
  const [skip, setSkip] = useState(0);
  const router = useRouter();
  const { error } = useAlert();
  const { data, isLoading, isFetching, isError, refetch } = useNotifications(skip, PAGE_SIZE);
  const { markRead, markAllRead } = useMarkNotificationsRead();
  const isUpdating = markRead.isPending || markAllRead.isPending;
  const notifications = data?.notifications ?? [];

  const openLink = (link: string) => {
    try {
      const url = new URL(link, window.location.origin);
      if (url.origin !== window.location.origin) {
        error("Unable to open a notification link outside this site.");
        return;
      }
      router.push(`${url.pathname}${url.search}${url.hash}`);
    } catch (err) {
      console.error("Invalid notification link:", err);
      error("Unable to open this notification link.");
    }
  };

  return (
    <div className="p-5">
      <Card
        title="Unread notifications"
        extra={
          <Button
            type="primary"
            disabled={!data?.unreadCount || isUpdating}
            loading={markAllRead.isPending}
            onClick={() => markAllRead.mutate(undefined, { onSuccess: () => setSkip(0) })}
          >
            Mark all as read
          </Button>
        }
      >
        {isError ? (
          <Alert
            type="error"
            showIcon
            title="Could not load notifications."
            action={
              <Button size="small" onClick={() => refetch()}>
                Retry
              </Button>
            }
          />
        ) : isLoading ? (
          <div className="flex justify-center py-10">
            <Spin />
          </div>
        ) : (
          <Spin spinning={isFetching}>
            {notifications.length === 0 ? (
              <Empty description="No unread notifications" />
            ) : (
              <Listy<UserNotification>
                items={notifications}
                height={480}
                rowKey="id"
                itemRender={(notification) => (
                  <div className="flex w-full flex-col gap-3 border-b border-gray-200 py-3 dark:border-gray-700 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0">
                      <Space wrap>
                        <span className="font-semibold">{notification.title}</span>
                        <Tag color="blue">Unread</Tag>
                      </Space>
                      <p className="mt-1 whitespace-pre-wrap wrap-break-word">{notification.body}</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {dayjs(notification.createdAt).format("MMM D, YYYY h:mm A")}
                      </p>
                    </div>
                    <Space wrap>
                      {notification.link && (
                        <Button onClick={() => openLink(notification.link!)}>View</Button>
                      )}
                      <Button
                        disabled={isUpdating}
                        loading={markRead.isPending && markRead.variables === notification.id}
                        onClick={() =>
                          markRead.mutate(notification.id, {
                            onSuccess: () => {
                              if (skip > 0 && notifications.length === 1) {
                                setSkip(Math.max(0, skip - PAGE_SIZE));
                              }
                            },
                          })
                        }
                      >
                        Mark as read
                      </Button>
                    </Space>
                  </div>
                )}
              />
            )}
            {(data?.total ?? 0) > PAGE_SIZE && (
              <div className="mt-4 flex justify-end">
                <Pagination
                  current={Math.floor(skip / PAGE_SIZE) + 1}
                  pageSize={PAGE_SIZE}
                  total={data?.total}
                  showSizeChanger={false}
                  onChange={(page) => setSkip((page - 1) * PAGE_SIZE)}
                />
              </div>
            )}
          </Spin>
        )}
      </Card>
    </div>
  );
};

export default NotificationsList;