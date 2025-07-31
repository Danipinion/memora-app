"use client";

import React, { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { id } from "date-fns/locale";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { CalendarIcon, Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { taskSchema } from "@/lib/form-schema";
import { createTask } from "@/actions/createTask";

interface FormAddTaskProps {
    groupId: number;
    members: { id: string; username: string }[];
}

export function FormAddTask({ groupId, members }: FormAddTaskProps) {
    const [open, setOpen] = useState(false);
    const [isPending, startTransition] = useTransition();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof taskSchema>>({
        resolver: zodResolver(taskSchema),
        defaultValues: {
            title: "",
            description: "",
            deadline: undefined,
            assignedUserIds: [],
            groupId: groupId,
        },
    });

    const onSubmit = (values: z.infer<typeof taskSchema>) => {
        startTransition(() => {
            createTask(values).then((data) => {
                if (data.error) {
                    toast({ title: "Gagal", description: data.error, variant: "destructive" });
                }
                if (data.success) {
                    toast({ title: "Berhasil", description: data.success });
                    form.reset();
                    router.refresh();
                    setOpen(false);
                }
            });
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="bg-purple">
                    <Plus className="mr-2 h-4 w-4" /> Tugas
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[480px]">
                <DialogHeader>
                    <DialogTitle>Buat Tugas Baru</DialogTitle>
                    <DialogDescription>Isi detail tugas yang akan diberikan kepada anggota grup.</DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem><FormLabel>Judul Tugas</FormLabel><FormControl><Input placeholder="Contoh: Membuat Desain UI" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem><FormLabel>Deskripsi</FormLabel><FormControl><Textarea placeholder="Jelaskan detail tugas di sini..." {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={form.control} name="deadline" render={({ field }) => (
                            <FormItem className="flex flex-col"><FormLabel>Deadline</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                                                {field.value ? format(field.value, "PPP", { locale: id }) : <span>Pilih tanggal</span>}
                                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 z-50" align="start">
                                        <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                                    </PopoverContent>
                                </Popover><FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="assignedUserIds" render={({ field }) => (
                            <FormItem><FormLabel>Tugaskan Kepada</FormLabel>
                                <Popover modal={true}>
                                    <PopoverTrigger asChild>
                                        <FormControl><Button variant="outline" role="combobox" className="w-full justify-between">
                                            {field.value?.length > 0 ? `${field.value.length} anggota dipilih` : "Pilih anggota..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[--radix-popover-trigger-width] p-0 z-[51]">
                                        <Command><CommandInput placeholder="Cari anggota..." />
                                            <CommandList><CommandEmpty>Anggota tidak ditemukan.</CommandEmpty>
                                                <CommandGroup>
                                                    {members.map((member) => (
                                                        <CommandItem key={member.id} onSelect={() => {
                                                            const newValues = field.value?.includes(member.id)
                                                                ? field.value.filter((id: any) => id !== member.id)
                                                                : [...(field.value || []), member.id];
                                                            field.onChange(newValues);
                                                        }}>
                                                            <Check className={cn("mr-2 h-4 w-4", field.value?.includes(member.id) ? "opacity-100" : "opacity-0")} />
                                                            {member.username}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover><FormMessage />
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <Button type="submit" disabled={isPending}>
                                {isPending ? "Menyimpan..." : "Simpan Tugas"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}