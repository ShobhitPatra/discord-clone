import { Channel, Server } from "@prisma/client";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "update-server"
  | "manage-members"
  | "create-channel"
  | "delete-server"
  | "leave-server"
  | null;

interface ModalDataI {
  server?: Server;
  channel?: Channel;
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
