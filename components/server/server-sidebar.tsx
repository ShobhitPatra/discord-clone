import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
// import { ChannelType } from "@prisma/client";
import { redirect } from "next/navigation";
import ServerSidebarHeader from "./server-sidebar-header";

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

  // const textChannels = server.channels.filter(
  //   (channel) => channel.type === ChannelType.TEXT
  // );
  // const audioChannels = server.channels.filter(
  //   (channel) => channel.type === ChannelType.AUDIO
  // );
  // const videoChannels = server.channels.filter(
  //   (channel) => channel.type === ChannelType.VIDEO
  // );

  const role = server.members.find(
    (member) => member.profileId == profile.id
  )?.role;
  return (
    <div className="h-full flex flex-col text-primary bg-[#F2F3F5] dark:bg-[#2B2D31]">
      <ServerSidebarHeader server={server} role={role} />
    </div>
  );
};

export default ServerSidebar;
