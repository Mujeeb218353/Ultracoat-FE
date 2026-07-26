import { useAlertApi } from "../selectors/alert.selector";
import alertStyles, { alertIcons } from "@/features/alert/styles/alert.styles";

const useAlert = () => {
  const api = useAlertApi();

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

export default useAlert;