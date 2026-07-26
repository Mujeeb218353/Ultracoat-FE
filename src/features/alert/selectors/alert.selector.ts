import useAlertStore from "../store/alert.store";

export const useAlertApi = () => useAlertStore((state) => state.api);
export const useSetAlertApi = () => useAlertStore((state) => state.setApi);