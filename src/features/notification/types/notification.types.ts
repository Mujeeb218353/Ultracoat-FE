export interface Notification {
  token: string
  platform?: string
}

export interface UserNotification {
  id: string;
  title: string;
  body: string;
  link: string | null;
  type: string | null;
  metadata: Record<string, unknown> | null;
  isRead: boolean;
  createdAt: string;
}

export interface NotificationsResponse {
  notifications: UserNotification[];
  total: number;
  unreadCount: number;
  
}