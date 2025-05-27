"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Channel, ChannelType, MemberRole, Server } from "@prisma/client";
import { EditIcon, Hash, Mic, Trash2, Video } from "lucide-react";

interface ServerChannelProps {
  channel: Channel;
  role: MemberRole | undefined;
  server: Server;
}
const IconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.AUDIO]: Mic,
  [ChannelType.VIDEO]: Video,
};
const ServerChannel = ({ channel, role, server }: ServerChannelProps) => {
  const { onOpen } = useModal();
  const Icon = IconMap[channel.type];
  return (
    <div className="p-1 flex justify-between">
      <div className="flex gap-x-2">
        <Icon className="w-3" />
        <label>{channel.name}</label>
      </div>
      <div className="flex gap-x-2">
        {role !== MemberRole.GUEST ? (
          <EditIcon
            className="w-3"
            onClick={() => onOpen(" edit-channel", { server, channel })}
          />
        ) : null}
        {role === MemberRole.ADMIN && channel.name !== "general" ? (
          <Trash2
            className="w-3"
            onClick={() => onOpen("delete-channel", { channel, server })}
          />
        ) : null}
      </div>
    </div>
  );
};
export default ServerChannel;
