import { create } from "zustand";
import type { MessageInstance } from "antd/es/message/interface";

interface MessageState {
  api: MessageInstance | null;
  setApi: (api: MessageInstance) => void;
}

const useMessageStore = create<MessageState>((set) => ({
  api: null,
  setApi: (api) => set({ api }),
}));

export default useMessageStore;