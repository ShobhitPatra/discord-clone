import { prisma } from "@/lib/db";
import { initialProfile } from "@/lib/initial-profile";
import { UserButton } from "@clerk/nextjs";

import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await initialProfile();
  console.log(`profile : ${profile}`);

  if (!profile) {
    redirect("/sign-in");
  }
  const server = await prisma.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    redirect(`/server/${server.id}`);
  }

  return (
    <div>
      <h2>Create your own server</h2>
      <UserButton />
    </div>
  );
}
