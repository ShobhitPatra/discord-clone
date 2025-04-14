import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { MemberRole } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, imageUrl } = await req.json();
    const user = await currentUser();
    if (!user) {
      console.log("user unauthorized");
      return NextResponse.json("Unauthorized User", { status: 401 });
    }
    const newServer = await prisma.server.create({
      data: {
        name,
        imageUrl,
        inviteCode: "fdksjhfkjdsh",
        profileId: user?.id,
        channels: {
          create: [{ name: "general", profileId: user.id }],
        },
        members: {
          create: [{ profileId: user.id, role: MemberRole.ADMIN }],
        },
      },
    });
    return NextResponse.json(newServer, { status: 201 });
  } catch (error) {
    console.log(`ERROR IN SERVER_POST_METHOD ${error}`);
    return NextResponse.json(`INTERNAL SERVER ERROR`, { status: 500 });
  }
}
