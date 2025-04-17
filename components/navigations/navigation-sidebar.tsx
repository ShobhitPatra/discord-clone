import { currentUser } from "@/lib/current-user";
import { prisma } from "@/lib/db";
import { redirect } from "next/navigation";
import NavigationSidebarClient from "./navigation-sidebar-client";

const NavigationSidebar = async () => {
  const profile = await currentUser();
  console.log("here ");
  if (!profile) {
    redirect("/");
  }
  const servers = await prisma.server.findMany({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });
  console.log(servers);
  return <NavigationSidebarClient servers={servers} />;
};

export default NavigationSidebar;
