"use client";
import axios from "axios";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogTitle,
} from "../ui/dialog";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ChannelType } from "@prisma/client";
import qs from "query-string";
import { useEffect } from "react";
const formSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),
  channelType: z.nativeEnum(ChannelType),
});

const CreateChannel = () => {
  const { isOpen, onClose, type, data } = useModal();
  const server = data?.server;
  const channelType = data?.channel?.type;
  const router = useRouter();
  const isModalOpen = type == "create-channel" && isOpen;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      channelType: ChannelType.TEXT,
    },
  });
  // handling loading state
  const isLoading = form.formState.isSubmitting;

  useEffect(() => {
    if (channelType) {
      form.setValue("channelType", channelType);
    }
    form.setValue("channelType", ChannelType.TEXT);
  }, [channelType, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const url = qs.stringifyUrl({
        url: `/api/channels/create`,
        query: { serverId: server?.id },
      });
      await axios.post(url, values);
      form.reset();
      router.refresh();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  const handleOnClose = () => {
    form.reset();
    onClose();
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={handleOnClose}>
      <DialogContent className="dark:bg-gradient-to-r dark:from-purple-900 dark:to-purple-950 bg-white text-black dark:text-white">
        <DialogHeader>
          <DialogTitle>
            <label className="text-xl font-bold uppercase dark:text-neutral-200/90">
              Create Channel on{" "}
              <span className="dark:text-green-400">{server?.name}</span>
            </label>
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-4 "
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <FormLabel>
                    <label className=" uppercase font-semibold">
                      channel name
                    </label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="channel name"
                      {...field}
                      className=" border-1 border-black bg-black focus-visible:ring-0  focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* selct channel type  */}
            <FormField
              control={form.control}
              name="channelType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="uppercase">Channel Type</FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full dark:text-neutral-200 bg-zinc-300/50 border-0 focus:ring-0 text-black ring-offset-0 focus:ring-offset-0 capitalize outline-none">
                        <SelectValue placeholder="Select a channel type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="dark:bg-neutral-200/80 dark:text-black">
                      {Object.values(ChannelType).map((type) => (
                        <SelectItem
                          key={type}
                          value={type}
                          className="capitalize"
                        >
                          {type.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end">
              <Button
                type="submit"
                variant="primary"
                disabled={isLoading}
                className="w-full"
              >
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannel;
