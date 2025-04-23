import { MemberRole } from "@prisma/client";
import { Avatar, AvatarImage } from "./avatar";
import { Label } from "./label";
import { cn } from "@/lib/utils";
import { ShieldAlert, ShieldCheck } from "lucide-react";

interface UserAvatarI {
  src: string;
  name: string;
  role: MemberRole;
  email: string;
}

const UserAvatar = ({ src, name, role, email }: UserAvatarI) => {
  return (
    <div className="flex gap-2 my-3">
      <div className="flex items-center justify-center">
        <Avatar>
          <AvatarImage src={src} />
        </Avatar>
      </div>
      <div className="flex flex-col justify-center ">
        <Label className="text-primary text-sm  dark:text-zinc-200">
          {name}
        </Label>
        <Label className="text-primary text-xs dark:text-zinc-400">
          {email}
        </Label>
      </div>
      <Label
        className={cn(
          "px-4",
          role === MemberRole.ADMIN
            ? "text-rose-500"
            : role === MemberRole.MODERATOR
            ? "text-indigo-400"
            : "text-green-400"
        )}
      >
        {role === MemberRole.ADMIN ? (
          <ShieldAlert />
        ) : role === MemberRole.MODERATOR ? (
          <ShieldCheck />
        ) : null}
      </Label>
    </div>
  );
};

export default UserAvatar;
