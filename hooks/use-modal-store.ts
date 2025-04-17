import { create } from "zustand";

export type ModalType = "createServer" | null;

interface ModalStoreI {
  type: ModalType;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreI>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type: ModalType) => set({ type, isOpen: true }),
  onClose: () => set({ type: null, isOpen: false }),
}));
