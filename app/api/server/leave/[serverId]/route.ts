import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { serverId: string };
  }
) {
  try {
    const profile = await currentUser();
    if (!profile?.id)
      return NextResponse.json({ msg: "unauthorized user" }, { status: 401 });

    if (!params.serverId)
      return NextResponse.json({ msg: "serverId is missing" }, { status: 401 });

    const server = await prisma.server.update({
      where: {
        id: params.serverId,
        profileId: { not: profile.id },
        members: { some: { profileId: profile.id } },
      },
      data: {
        members: { deleteMany: { profileId: profile.id } },
      },
    });

    return NextResponse.json(server, { status: 201 });
  } catch (error) {
    console.log(`[LEAVE SERVER],ERROR :${error}`);
    return NextResponse.json(
      { msg: " INTERNAL SERVER ERROR" },
      { status: 5000 }
    );
  }
}
