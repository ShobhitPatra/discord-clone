import ServerSidebar from "@/components/server/server-sidebar";
import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";

import React from "react";
export default async function ServerLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { serverId: string };
}) {
  const profile = await currentUser();

  if (!profile) return redirect("/sign-in");
  const server = await prisma.server.findUnique({
    where: {
      id: params.serverId,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  if (!server) {
    redirect("/");
  }
  return (
    <div className="h-full">
      <div className=" bg-slate-900 md:flex h-full w-60 z-20 flex-col inset-y-0 fixed">
        <ServerSidebar serverId={params?.serverId} />
      </div>
      <main className="h-full md:pl-60">{children}</main>
    </div>
  );
}
