"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { groupsSchema } from "@/lib/form-schema";
import { Plus } from "lucide-react";
import { createGroup } from "@/actions/groups/createGroups";

export function FormAddGroup() {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  // 2. Inisialisasi Form
  const form = useForm<z.infer<typeof groupsSchema>>({
    resolver: zodResolver(groupsSchema),
    defaultValues: {
      name: "",
    },
  });

  // 3. Logika saat Form di-submit
  const onSubmit = (values: z.infer<typeof groupsSchema>) => {
    startTransition(() => {
      createGroup(values.name).then((data: any) => {
        if (data.error) {
          toast({
            title: "Gagal Membuat Grup",
            description: data.error,
            variant: "destructive",
          });
        }

        if (data.success) {
          toast({
            title: "Berhasil!",
            description: data.success,
          });
          form.reset(); // Reset field form
          router.refresh(); // Refresh data di halaman
          setOpen(false); // Tutup modal
        }
      });
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-purple">
          <Plus className="mr-2 h-4 w-4" /> Grup
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buat Grup Baru</DialogTitle>
          <DialogDescription>
            Masukkan nama grup untuk memulai kolaborasi dengan tim Anda.
          </DialogDescription>
        </DialogHeader>

        {/* 5. Form di dalam Modal */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Grup</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Contoh: Tim Proyek Akhir"
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Menyimpan..." : "Simpan"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}