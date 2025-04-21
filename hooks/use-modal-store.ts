import { Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType = "createServer" | "invite" | null;

interface ModalDataI {
  server?: Server;
}
interface ModalStoreI {
  data: ModalDataI;
  type?: ModalType;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalDataI) => void;
  onClose: () => void;
}

export const useModal = create<ModalStoreI>((set) => ({
  data: {},
  type: null,
  isOpen: false,
  onOpen: (type: ModalType, data?: ModalDataI) =>
    set({ type, isOpen: true, data }),
  onClose: () => set({ type: null, isOpen: false }),
}));
