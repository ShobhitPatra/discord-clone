import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, channelType } = await req.json();
    const profile = await currentUser();
    if (!profile?.id)
      return NextResponse.json({ msg: "unauthorized user " }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return NextResponse.json({ msg: "serverId missing" }, { status: 401 });
    const server = await prisma.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            profileId: profile.id,
            role: {
              in: [MemberRole.ADMIN, MemberRole.MODERATOR],
            },
          },
        },
      },
      data: {
        channels: {
          create: [{ profileId: profile.id, name, type: channelType }],
        },
      },
    });
    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.log(`[CHANNEL_CREATE],ERROR :${error}`);
    return NextResponse.json({ msg: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
