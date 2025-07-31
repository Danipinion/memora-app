"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTransition } from "react";
import { useToast } from "@/hooks/use-toast";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserPlus } from "lucide-react";
import { inviteSchema } from "@/lib/form-schema";
import { inviteUserToGroup } from "@/actions/invitations/inviteUserToGroup";

interface FormInviteUserProps {
  groupId: number;
}

export const FormInviteUser = ({ groupId }: FormInviteUserProps) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof inviteSchema>>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { username: "" },
  });

  const onSubmit = (values: z.infer<typeof inviteSchema>) => {
    startTransition(() => {
      inviteUserToGroup(groupId, values.username).then((data) => {
        if (data.error) {
          toast({ title: "Gagal", description: data.error, variant: "destructive" });
        }
        if (data.success) {
          toast({ title: "Berhasil", description: data.success });
          form.reset();
        }
      });
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <UserPlus className="h-6 w-6 sm:mr-2" />
          <span className="hidden sm:inline">Undang Anggota</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mr-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Undang Angota</h4>
              <p className="text-sm text-muted-foreground">
                Masukkan username pengguna untuk diundang.
              </p>
            </div>
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isPending}>
              {isPending ? "Mengirim..." : "Kirim Undangan"}
            </Button>
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};