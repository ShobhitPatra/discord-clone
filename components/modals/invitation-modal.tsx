"use client";
import { useModal } from "@/hooks/use-modal-store";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Check, Copy, RefreshCcw } from "lucide-react";
import UseOrigin from "@/hooks/use-origin";
import { useState } from "react";

const InvitaionModal = () => {
  const { isOpen, type, onClose, data } = useModal();

  const isModalOpen = type == "invite" && isOpen;

  const origin = UseOrigin();
  const server = data?.server;
  const inviteUrl = `${origin}/invite/${server?.inviteCode}`;
  console.log(`inviteurl :${inviteUrl}`);

  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onCopy = () => {
    setIsLoading(true);
    navigator.clipboard.writeText(inviteUrl);
    setIsCopied(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsCopied(false);
    }, 1000);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gradient-to-r dark:from-purple-900 dark:to-purple-950 bg-white text-black">
        <DialogHeader>
          <DialogTitle className=" flex justify-center">
            <Label className="dark:text-neutral-200/80 font-bold text-xl  ">
              INVITE MEMBERS
            </Label>
          </DialogTitle>
          <div className="flex flex-col gap-3 mt-6">
            <Label className="dark:text-neutral-300  text-sm">
              Use this link to invide members to server
            </Label>
            <div className="flex gap-1">
              <Input
                disabled={isLoading}
                value={inviteUrl}
                className="bg-zinc-500 outline-indigo-50 dark:text-white"
              />
              <button
                onClick={onCopy}
                disabled={isLoading}
                className="dark:bg-zinc-200/20 p-2 rounded-md
              hover:dark:bg-zinc-200/10
              "
              >
                {isCopied ? (
                  <Check className="dark:text-neutral-200/80 h-5 w-5" />
                ) : (
                  <Copy className="dark:text-neutral-200/80 h-5 w-5" />
                )}
              </button>
            </div>
            <div className="flex gap-2 items-center">
              <button
                disabled={isLoading}
                className="dark:text-blue-300
              dark:hover:text-blue-400
              hover:underline"
              >
                Generate new invitation code{" "}
              </button>
              <RefreshCcw className="h-4 w-4  dark:text-indigo-400" />
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InvitaionModal;
