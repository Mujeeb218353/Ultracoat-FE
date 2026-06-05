import useAlertStore from "@/features/alert/store/alert.store";
import alertStyles, { alertIcons } from "@/features/alert/styles/alert.styles";

const useNotify = () => {
  const api = useAlertStore((s) => s.api);

  return {
    success: (content: string) =>
      api?.open({
        type: "success",
        content,
        icon: alertIcons.success,
        styles: alertStyles.success,
      }),
    error: (content: string) =>
      api?.open({
        type: "error",
        content,
        icon: alertIcons.error,
        styles: alertStyles.error,
      }),
    warning: (content: string) =>
      api?.open({
        type: "warning",
        content,
        icon: alertIcons.warning,
        styles: alertStyles.warning,
      }),
    info: (content: string) =>
      api?.open({
        type: "info",
        content,
        icon: alertIcons.info,
        styles: alertStyles.info,
      }),
  };
};

export default useNotify;