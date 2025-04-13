import { currentUser } from "@clerk/nextjs/server";
import { prisma } from "./db";

export const initialProfile = async () => {
  const user = await currentUser();

  if (!user) {
    console.log("redirecting to sign-in");
    return null;
  }

  const profile = await prisma.profile.findUnique({
    where: {
      userId: user.id,
    },
  });
  if (profile) {
    console.log(`profile found`);
    return profile;
  }
  const newUser = await prisma.profile.create({
    data: {
      userId: user.id,
      email: user.emailAddresses[0].emailAddress,
      imageUrl: user.imageUrl,
      name: `${user.firstName} ${user.lastName}`,
    },
  });
  console.log(`new user created`);
  return newUser;
};
