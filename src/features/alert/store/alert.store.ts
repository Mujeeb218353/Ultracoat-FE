import { create } from "zustand";
import type { MessageInstance } from "antd/es/message/interface";

interface AlertState {
  api: MessageInstance | null;
  setApi: (api: MessageInstance) => void;
}

const useAlertStore = create<AlertState>((set) => ({
  api: null,
  setApi: (api) => set({ api }),
}));

export default useAlertStore;