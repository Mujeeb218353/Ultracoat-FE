import useModalStore from "../store/modal.store";

export const useActiveModal = () => useModalStore((state) => state.activeModal);
export const useModalData = <T>() => useModalStore((state) => state.modalData as T);

export const useOpenModal = () => useModalStore((state) => state.openModal);
export const useCloseModal = () => useModalStore((state) => state.closeModal);