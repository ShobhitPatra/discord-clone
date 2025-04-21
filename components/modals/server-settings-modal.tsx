"use client";
import {
  DialogFooter,
  DialogHeader,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import axios from "axios";
import FileUploadComponent from "../file-upload";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-modal-store";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "This field is required",
  }),
  imageUrl: z.string().min(1, {
    message: "This field is required",
  }),
});

const ServerSettingsModal = () => {
  const { data, type, isOpen } = useModal();
  const server = data?.server;
  const isModalOpen = isOpen && type === "update-server";

  // resolving hydration error
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
  });

  useEffect(() => {
    if (server) {
      form.setValue("name", server?.name);
      form.setValue("imageUrl", server?.imageUrl);
    }
  }, [server, form]);
  // handling loading state
  const isLoading = form.formState.isSubmitting;
  // handling submit
  const router = useRouter();
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/server/${server?.id}`, values);
      router.refresh();
      window.location.reload();
    } catch (error) {
      console.log("inside catch");
      console.log(error);
    }
  };

  if (!isMounted) return null;
  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="bg-white overflow-hidden text-black p-1 rounded-md">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-2xl text-center font-bold">
            Create your own server
          </DialogTitle>
          <DialogDescription className="text-center text-zinc-500">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col space-y-8 "
          >
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="flex justify-center items-center pt-4">
                  <FormControl>
                    <FileUploadComponent
                      endpoint="serverImage"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex flex-col space-y-3 px-6">
                  <FormLabel>
                    <label className="text-black uppercase font-semibold">
                      server name
                    </label>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="server name"
                      {...field}
                      className=" border-1 border-black bg-black focus-visible:ring-0  focus-visible:ring-offset-0"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="flex justify-end py-8 px-6">
              <Button type="submit" variant="primary" disabled={isLoading}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ServerSettingsModal;
