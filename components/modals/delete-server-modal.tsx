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

const DeleteServer = () => {
  const { isOpen, type, onClose, data } = useModal();
  const isModalOpen = type == "delete-server" && isOpen;
  const server = data?.server;
  const router = useRouter();

  const onSubmit = async () => {
    try {
      await axios.delete(`/api/server/${server?.id}`);
      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="dark:bg-gradient-to-r dark:from-purple-900 dark:to-purple-950 bg-white text-black">
        <DialogHeader>
          <DialogTitle className=" flex justify-center">
            <Label className="uppercase dark:text-neutral-200/80 font-bold text-xl  ">
              Delete server{" "}
              <span className="dark:text-green-400">{server?.name}</span>
            </Label>
          </DialogTitle>{" "}
          <DialogDescription>
            Are you sure you want to delete this server.This action is not
            reversible.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmit} variant={"destructive"}>
            Confirm
          </Button>
          <Button onClick={onClose} className="text-md" variant={"secondary"}>
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteServer;
