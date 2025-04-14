import { auth } from "@clerk/nextjs/server";
import { prisma } from "./db";
export const currentUser = async () => {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }
  const user = prisma.profile.findUnique({
    where: {
      userId,
    },
  });
  return user;
};
