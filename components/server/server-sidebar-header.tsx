"use client";
import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  LogOut,
  Plus,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";
import { useModal } from "@/hooks/use-modal-store";
interface ServerSideBarHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerSidebarHeader = ({ server, role }: ServerSideBarHeaderProps) => {
  const { onOpen } = useModal();
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <header
            className="
            w-full transition
          border-b-2 border-neutral-200 dark:border-neutral-800 dark:hover:bg-zinc-700/50 hover:bg-zinc-700/10
          flex justify-between px-4 py-2 text-white text-md font-semibold"
          >
            <label>{server.name}</label>
            <ChevronDown className="h-5 w-5" />
          </header>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="text-xstext-black dark:text-neutral-200 bg-slate-800 w-56">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("invite", { server });
              }}
              className="p-2 text-indigo-500 flex justify-between"
            >
              <label>Invite Members</label>
              <UserPlus className="w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("update-server", { server });
              }}
              className="p- flex justify-between "
            >
              <label>Server Settings</label>
              <Settings className="w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isAdmin && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("manage-members", { server });
              }}
              className="p- flex justify-between "
            >
              <label>Manage Members</label>
              <User className="w-4 h-4" />
            </DropdownMenuItem>
          )}
          {isModerator && (
            <DropdownMenuItem
              onClick={() => {
                onOpen("create-channel", { server });
              }}
              className="p- flex justify-between "
            >
              <label>Create Channel</label>
              <Plus className="w-4 h-4" />
            </DropdownMenuItem>
          )}

          {isModerator && (
            <DropdownMenuSeparator className="bg-slate-400/20 w-2/3    ml-5" />
          )}
          {isAdmin && (
            <DropdownMenuItem className="p- flex justify-between text-rose-500">
              <label>Remove users</label>
              <Trash className="w-4 h-4" />
            </DropdownMenuItem>
          )}
          {!isAdmin && (
            <DropdownMenuItem className="p- flex justify-between text-rose-500">
              <label>Leave Server</label>
              <LogOut className="w-4 h-4" />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default ServerSidebarHeader;
