import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const auth = (req: Request) => ({ id: "fakeId" }); // Fake auth function
const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("unauthorized user");
  return { userId };
};
// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
      console.log(`server image uploaded ${file.ufsUrl}`);
    }),
  messageFile: f(["image", "pdf", "video"])
    .middleware(() => handleAuth())
    .onUploadComplete(({ file }) => {
      console.log(`messageFile uploaded : ${file.ufsUrl}`);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
