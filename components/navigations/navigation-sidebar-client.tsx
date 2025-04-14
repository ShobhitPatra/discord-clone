"use client";
import { Plus } from "lucide-react";
import TooltipComponent from "../ui/tooltip-component";
import { Separator } from "../ui/separator";
import { Server } from "@prisma/client";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { ScrollArea } from "../ui/scroll-area";

const NavigationSidebarClient = ({ servers }: { servers: Server[] }) => {
  const router = useRouter();
  //   const params = useParams();
  return (
    <main
      className="flex flex-col h-full bg-zinc-400 
    dark:bg-[#1E1F22]
    w-full text-primary "
    >
      {/* create server toosltip */}
      <div className="flex py-4 justify-center items-center">
        <TooltipComponent
          side="right"
          onClickAction={() => {
            console.log("object");
          }}
          content="create a server"
          label={
            <Plus className="size-8 p-1 bg-emerald-500 rounded-full hover:bg-emerald-500/80 " />
          }
        ></TooltipComponent>
      </div>
      {/* separator */}
      <div className="flex justify-center">
        <Separator className="rounded h-[2px] mx-auto bg-zinc-700 w-2/3 " />
      </div>
      {/* severs  */}
      <div className="flex justify-center p-3">
        <ScrollArea className="w-full flex-1">
          {servers.map((server) => {
            return (
              <div key={server.id}>
                <TooltipComponent
                  onClickAction={() => router.push(`server/${server.id}`)}
                  label={
                    <button
                      className={cn(
                        "relative bg-zinc-300  w-12 h-12 rounded-lg overflow-hidden"
                      )}
                    >
                      <Image
                        className="absolute "
                        src={server.imageUrl}
                        alt="server-image"
                        fill
                      />
                    </button>
                  }
                  key={server.id}
                  side="right"
                  content={server.name}
                />
                {/* footer  */}
              </div>
            );
          })}
        </ScrollArea>
      </div>
      <footer className="flex h-full py-16 items-end justify-center ">
        <UserButton />
      </footer>
    </main>
  );
};

export default NavigationSidebarClient;
