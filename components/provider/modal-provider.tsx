"use client";
import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InvitaionModal from "../modals/invitation-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return !isMounted ? null : (
    <>
      <CreateServerModal />
      <InvitaionModal />
    </>
  );
};
