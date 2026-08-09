import { create } from "zustand";
import {  ModalType, ModalStore } from "../types/modal.types";

const useModalStore = create<ModalStore>((set) => ({
  activeModal: null,
  modalData: null,

  openModal: <T>(type: ModalType, data?: T | null) =>  set({ activeModal: type, modalData: data }),
  closeModal: () => set({ activeModal: null, modalData: null }),
}));

export default useModalStore;