import { ServerWithMembersWithProfiles } from "@/types";
import { MemberRole } from "@prisma/client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  ChevronDown,
  Delete,
  Plus,
  Settings,
  Trash,
  User,
  UserPlus,
} from "lucide-react";
interface ServerSideBarHeaderProps {
  server: ServerWithMembersWithProfiles;
  role?: MemberRole;
}

const ServerSidebarHeader = ({ server, role }: ServerSideBarHeaderProps) => {
  const isAdmin = role === MemberRole.ADMIN;
  const isModerator = isAdmin || role === MemberRole.MODERATOR;
  return (
    <div className="bg-slate-800 w-full ">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <button className="flex justify-between  bg-red-500 px-4 py-2 text-white text-md font-semibold">
            <label>{server.name}</label>
            <ChevronDown />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-slate-800">
          {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator /> */}
          <DropdownMenuItem className="p-2 text-indigo-500 flex justify-between">
            <label>Invite Members</label>
            <UserPlus className="w-4 h-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="p- flex justify-between ">
            <label>Server Settings</label>
            <Settings className="w-4 h-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="p- flex justify-between ">
            <label>Manage Members</label>
            <User className="w-4 h-4" />
          </DropdownMenuItem>
          <DropdownMenuItem className="p- flex justify-between ">
            <label>Create Channel</label>
            <Plus className="w-4 h-4" />
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-slate-400/20 w-2/3    ml-5" />
          <DropdownMenuItem className="p- flex justify-between text-rose-500">
            <label>Remove users</label>
            <Trash className="w-4 h-4" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ServerSidebarHeader;
