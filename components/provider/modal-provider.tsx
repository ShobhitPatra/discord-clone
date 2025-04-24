"use client";
import { useEffect, useState } from "react";
import CreateServerModal from "../modals/create-server-modal";
import InvitaionModal from "../modals/invitation-modal";
import ServerSettingsModal from "../modals/server-settings-modal";
import ManageMembersModal from "../modals/manage-members-modal";
import CreateChannel from "../modals/create-channel-modal";
import DeleteServer from "../modals/delete-server-modal";
import LeaveServer from "../modals/leave-server";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return !isMounted ? null : (
    <>
      <CreateServerModal />
      <InvitaionModal />
      <ServerSettingsModal />
      <ManageMembersModal />
      <CreateChannel />
      <DeleteServer />
      <LeaveServer />
    </>
  );
};
