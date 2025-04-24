import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { serverId: string } }
) {
  try {
    const profile = await currentUser();
    const { name, imageUrl } = await req.json();
    if (!profile?.id)
      return NextResponse.json(
        {
          msg: "unauthorized",
        },
        { status: 401 }
      );

    const updatedServer = await prisma.server.update({
      where: {
        id: params?.serverId,
        profileId: profile.id,
      },
      data: {
        name,
        imageUrl,
      },
    });

    return NextResponse.json(
      {
        msg: "server details updated",
        updatedServer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(`error in serverid patch ${error}`);
    return NextResponse.json({ msg: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      serverId: string;
    };
  }
) {
  try {
    const profile = await currentUser();
    if (!profile?.id)
      return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });
    if (!params.serverId)
      return NextResponse.json({ msg: "serevrId is missing" }, { status: 401 });

    const server = await prisma.server.delete({
      where: {
        id: params.serverId,
        profileId: profile.id,
      },
    });
    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.log(`[SERVER DELETE], ERROR :${error}`);
    return NextResponse.json({ msg: "INTERNAL SERVER ERROR" }, { status: 500 });
  }
}
