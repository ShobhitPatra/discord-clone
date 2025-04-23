import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";

import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { memberId: string };
  }
) {
  try {
    const profile = await currentUser();
    if (!profile?.id)
      return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return NextResponse.json({ msg: "serverId is missing" }, { status: 401 });

    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          deleteMany: {
            id: params.memberId,
            NOT: {
              profileId: profile.id,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.log(`[MEMBERS DELETE] ,error :${error}`);
    return NextResponse.json("INTERNAL SERVER ERROR ", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      memberId: string;
    };
  }
) {
  try {
    const profile = await currentUser();
    if (!profile?.id)
      return NextResponse.json({ msg: "user unauthorized" }, { status: 401 });
    const { searchParams } = new URL(req.url);
    const serverId = searchParams.get("serverId");
    if (!serverId)
      return NextResponse.json({ msg: "serverId is missing" }, { status: 401 });
    const { role } = await req.json();
    const server = await prisma.server.update({
      where: {
        id: serverId,
        profileId: profile.id,
      },
      data: {
        members: {
          update: {
            where: {
              id: params.memberId,
            },
            data: {
              role,
            },
          },
        },
      },
      include: {
        members: {
          include: {
            profile: true,
          },
          orderBy: {
            role: "asc",
          },
        },
      },
    });
    return NextResponse.json(server, {
      status: 201,
    });
  } catch (error) {
    console.log(`[MEMBERS : PATCH],error : ${error}`);
    return NextResponse.json({ msg: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
