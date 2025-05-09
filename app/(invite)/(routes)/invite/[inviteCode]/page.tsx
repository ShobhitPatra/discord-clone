import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";

import { redirect } from "next/navigation";

interface InvitationPageProps {
  params: {
    inviteCode: string;
  };
}
const InvitationPage = async ({ params }: InvitationPageProps) => {
  const profile = await currentUser();

  if (!profile) redirect("/");

  if (!profile.id) redirect("/");

  if (!params.inviteCode) redirect("/");

  const isAlreadyMember = await prisma.server.findFirst({
    where: {
      inviteCode: params.inviteCode,
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (isAlreadyMember) redirect(`/server/${isAlreadyMember.id}`);

  const joinServer = await prisma.server.update({
    where: {
      inviteCode: params.inviteCode,
    },
    data: {
      members: {
        create: [
          {
            profileId: profile.id,
          },
        ],
      },
    },
  });

  if (joinServer) return redirect(`/server/${joinServer.id}`);

  return null;
};
export default InvitationPage;
