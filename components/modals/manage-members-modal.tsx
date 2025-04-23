"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { ServerWithMembersWithProfiles } from "@/types";
import { ScrollArea } from "../ui/scroll-area";
import UserAvatar from "../ui/user-avatar";
import { Check, Loader2, MoreVertical } from "lucide-react";
import { MemberRole, Server } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useState } from "react";
import qs from "query-string";
import axios from "axios";
import { useRouter } from "next/navigation";

const ManageMembersModal = () => {
  const { onOpen, isOpen, type, onClose, data } = useModal();
  const server = data?.server as ServerWithMembersWithProfiles;
  const isModalOpen = type == "manage-members" && isOpen;
  const [loadinId, setLoadingId] = useState("");
  const router = useRouter();

  const onKick = async (memberId: string) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id },
      });
      const response = await axios.delete(url);
      const data = await response?.data;
      router.refresh();
      onOpen("manage-members", { server: data as Server });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  const onRoleChange = async (memberId: string, role: MemberRole) => {
    try {
      setLoadingId(memberId);
      const url = qs.stringifyUrl({
        url: `/api/members/${memberId}`,
        query: { serverId: server?.id },
      });

      const response = await axios.patch(url, { role });
      const data = await response.data;

      console.log(`data :${data}`);
      router.refresh();
      onOpen("manage-members", { server: data as Server });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gradient-to-r dark:from-purple-900 dark:to-purple-950 bg-white text-black dark:text-white">
        <DialogHeader>
          <DialogTitle className="flex justify-center">
            <Label className="dark:text-neutral-200/80 font-bold text-xl  ">
              MANAGE MANAGERS
            </Label>
          </DialogTitle>
          <DialogDescription>
            {server?.members?.length} Members
          </DialogDescription>
          <ScrollArea className=" p-2 max-h-[420px]">
            {server?.members?.map((member) => (
              <div
                key={member.id}
                className="flex justify-between items-center "
              >
                <UserAvatar
                  key={member.profile.id}
                  name={member.profile.name}
                  email={member.profile.email}
                  src={member.profile.imageUrl}
                  role={member.role}
                />
                {member.role !== MemberRole.ADMIN ? (
                  loadinId !== member.id ? (
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <MoreVertical className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="dark:bg-neutral-300/90 dark:text-zinc-900 font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger className="py-1 flex rounded-md justify-start w-full text-sm pl-2 dark:hover:bg-neutral-200 dark:hover:text-black">
                            <label>Role</label>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="dark:bg-neutral-300/90 dark:text-zinc-900 font-medium">
                            <DropdownMenuItem
                              onClick={() =>
                                onRoleChange(member.id, MemberRole.MODERATOR)
                              }
                              className="dark:hover:bg-neutral-200 dark:hover:text-black"
                            >
                              Moderator
                              {member.role === MemberRole.MODERATOR && (
                                <Check className="h4 w-4 ml-auto text-green-800" />
                              )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() =>
                                onRoleChange(member.id, MemberRole.GUEST)
                              }
                              className="dark:hover:bg-neutral-200 dark:hover:text-black"
                            >
                              Guest
                              {member.role === MemberRole.GUEST && (
                                <Check className="h4 w-4 ml-auto text-green-800" />
                              )}
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => onKick(member.id)}
                          className="dark:hover:bg-neutral-200 dark:hover:text-black"
                        >
                          Kick
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Loader2 className="animate-spin h-4 w-4" />
                  )
                ) : null}
              </div>
            ))}
          </ScrollArea>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ManageMembersModal;
