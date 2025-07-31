"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

import { registerAction } from "@/actions/auth/register";
import { registerSchema } from "@/lib/form-schema";
import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { ButtonAuth } from "@/components/button/ButtonAuth";
import { InputPassword } from "@/components/input/inputPassword";
import { FormInput } from "@/components/input/FormInput";

type RegisterForm = z.infer<typeof registerSchema>;

export function FormRegister() {
    const router = useRouter();
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();

    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            username: "",
            email: "",
            number: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = (formData: RegisterForm) => {
        startTransition(() => {
            registerAction(formData).then((response) => {
                if (response?.error) {
                    toast({
                        title: "Pendaftaran Gagal",
                        description: response.error,
                        variant: "destructive",
                    });
                } else if (response?.success) {
                    toast({
                        title: "Berhasil Daftar!",
                        description: response.success || "Silahkan Login.",
                    });
                    router.push('/auth/login');
                }
            });
        });
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center items-center w-full"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full max-w-sm space-y-6">
                    <div className="w-full text-center">
                        <h1 className="text-2xl font-semibold" style={{ color: "#6C63FF" }}>
                            Daftar dulu ya!
                        </h1>
                        <p className="text-slate-700">Mohon daftar akun untuk melanjutkan</p>
                    </div>

                    <FormInput
                        control={form.control}
                        name="username"
                        placeholder="Masukkan Username"
                    />

                    <FormInput
                        control={form.control}
                        name="email"
                        placeholder="email@example.com"
                    />

                    <FormInput
                        control={form.control}
                        name="number"
                        placeholder="0857XXXXXXXX"
                    />

                    <InputPassword
                        name="password"
                        placeholder="Masukkan Password"
                        control={form.control}
                    />

                    <InputPassword
                        name="confirmPassword"
                        placeholder="Konfirmasi Password"
                        control={form.control}
                    />

                    <ButtonAuth isPending={isPending} label="Daftar" type="submit" />

                    <div className="text-center text-sm">
                        <p>
                            Sudah punya akun?{" "}
                            <Link href={"/auth/login"} className="font-semibold text-purple cursor-pointer">
                                Masuk
                            </Link>
                        </p>
                    </div>
                </form>
            </Form>
        </motion.div>
    );
}