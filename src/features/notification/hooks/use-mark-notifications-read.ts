import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAlert from "@/features/alert/hooks/use-alert";
import notificationsApi from "../api/notification.api";

const useMarkNotificationsRead = () => {
  const queryClient = useQueryClient();
  const { error } = useAlert();
  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["notifications"] });

  const markRead = useMutation({
    mutationFn: notificationsApi.markAsRead,
    onSuccess: invalidate,
    onError: (err) => error(err, "Failed to mark notification as read."),
  });

  const markAllRead = useMutation({
    mutationFn: notificationsApi.markAllAsRead,
    onSuccess: invalidate,
    onError: (err) => error(err, "Failed to mark notifications as read."),
  });

  return { markRead, markAllRead };
};

export default useMarkNotificationsRead;
