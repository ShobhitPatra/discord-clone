"use client";
import { useModal } from "@/hooks/use-modal-store";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";

const LeaveServer = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = type == "leave-server" && isOpen;
  const [isLoading, setIsLoading] = useState(false);
  const server = data?.server;
  const router = useRouter();

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/server/leave/${server?.id}`);
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gradient-to-r dark:from-purple-900 dark:to-purple-950 bg-white text-black">
        <DialogHeader>
          <DialogTitle className=" flex justify-center">
            <Label className="uppercase dark:text-neutral-200/80 font-bold text-xl  ">
              leave server{" "}
              <span className="dark:text-green-400">{server?.name}</span>
            </Label>
          </DialogTitle>{" "}
          <DialogDescription>
            Are you sure you want to leave this server?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={onSubmit}
            disabled={isLoading}
            variant={"destructive"}
          >
            {isLoading ? (
              <Loader2 className="animate" />
            ) : (
              <label>Confirm</label>
            )}
          </Button>

          <Button
            onClick={onClose}
            disabled={isLoading}
            className="text-md"
            variant={"secondary"}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LeaveServer;
