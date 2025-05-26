import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: { channelId: string } }
) {
  try {
    const profile = await currentUser();
    if (!profile?.id)
      return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId) {
      console.log("im here");
      console.log(searchParams);
      return NextResponse.json({ msg: `${searchParams}` }, { status: 401 });
    }

    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: ["ADMIN"],
            },
          },
        },
      },
      data: {
        channels: {
          delete: {
            id: params.channelId,
            name: {
              not: "general",
            },
          },
        },
      },
    });
    return NextResponse.json(server);
  } catch (error) {
    console.log(`CHANNELS/ChannelId ${error}`);
  }
}
