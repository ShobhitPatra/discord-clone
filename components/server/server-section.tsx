"use client";
import { useModal } from "@/hooks/use-modal-store";
import { MemberRole, Server } from "@prisma/client";
import { Plus, Settings } from "lucide-react";

interface ServerSectionProps {
  server: Server;
  label: string;
  role: MemberRole | undefined;
}
const ServerSection = ({ label, role, server }: ServerSectionProps) => {
  const { onOpen } = useModal();
  return (
    <>
      <div className="text-md p-1 flex justify-between">
        <label>{label}</label>
        <div className="flex gap-x-2">
          {role === MemberRole.ADMIN ? (
            <Settings
              className="w-4"
              onClick={() => onOpen("manage-members", { server })}
            />
          ) : null}

          <Plus
            className="w-4"
            onClick={() => onOpen("create-channel", { server })}
          />
        </div>
      </div>
    </>
  );
};
export default ServerSection;
