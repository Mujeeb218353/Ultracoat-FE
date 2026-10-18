export type ModalType = 
  | "UPDATE_PROFILE" 
  | "UPDATE_PASSWORD"
  | "CREATE_REPRESENTATIVE" 
  | "VIEW_REPRESENTATIVE" 
  | "UPDATE_REPRESENTATIVE"
  | "UPDATE_REPRESENTATIVE_STATUS"
  | "UPDATE_REPRESENTATIVE_EMAIL"
  | "DELETE_REPRESENTATIVE" 
  | "CREATE_CUSTOMER"
  | "VIEW_CUSTOMER"
  | "UPDATE_CUSTOMER"
  | "DELETE_CUSTOMER"
  | "CREATE_SIZE"
  | "VIEW_SIZE"
  | "UPDATE_SIZE"
  | "DELETE_SIZE"
  | "CREATE_FEATURE"
  | "VIEW_FEATURE"
  | "UPDATE_FEATURE"
  | "UPDATE_FEATURE_STATUS"
  | "DELETE_FEATURE"
  | "PREVIEW_QUOTATION"
  | "DELETE_QUOTATION"
  | null;

export interface ModalStore {
  activeModal: ModalType;
  modalData?: unknown;
  openModal: <T>(type: ModalType, data?: T) => void;
  closeModal: () => void;
};