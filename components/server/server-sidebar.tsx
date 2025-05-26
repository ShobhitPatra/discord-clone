import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
// import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerSidebarHeader from "./server-sidebar-header";
import { ChannelType } from "@prisma/client";
import ServerSection from "./server-section";
import ServerChannel from "./server-channels";

interface ServerSidebarProps {
  serverId: string;
}
const ServerSidebar = async ({ serverId }: ServerSidebarProps) => {
  const profile = await currentUser();
  if (!profile) return redirect("/");
  const server = await prisma.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      members: {
        orderBy: {
          role: "asc",
        },
        include: {
          profile: true,
        },
      },
      channels: {
        orderBy: {
          type: "asc",
        },
      },
    },
  });
  if (!server) return redirect("/");

  const channels = server.channels;
  const textChannels = channels.filter(
    (channel) => channel.type === ChannelType.TEXT
  );
  const audioChannels = channels.filter(
    (channel) => channel.type === ChannelType.AUDIO
  );
  const videoChannels = channels.filter(
    (channel) => channel.type === ChannelType.VIDEO
  );

  const role = server.members.find(
    (member) => member.profileId == profile.id
  )?.role;
  return (
    <div className="h-full flex flex-col text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <ServerSidebarHeader server={server} role={role} channels={channels} />
      <div>
        {!!textChannels?.length && (
          <div>
            <ServerSection label="Text Channels" role={role} server={server} />

            {textChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!audioChannels?.length && (
          <div>
            <ServerSection label="Audio Channels" role={role} server={server} />

            {audioChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
        {!!videoChannels?.length && (
          <div>
            <ServerSection label="Video Channels" role={role} server={server} />

            {videoChannels.map((channel) => (
              <ServerChannel
                key={channel.id}
                channel={channel}
                role={role}
                server={server}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ServerSidebar;
