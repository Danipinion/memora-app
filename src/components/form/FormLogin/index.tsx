"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { loginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { loginAction } from "@/actions/auth/login";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { default_login_redirect } from "@/routes";
import { ButtonAuth } from "@/components/button/ButtonAuth";
import { FormInput } from "@/components/input/FormInput";
import { InputPassword } from "@/components/input/inputPassword";

type LoginForm = z.infer<typeof loginSchema>;

export function FormLogin() {
    const { toast } = useToast();
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const form = useForm<LoginForm>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailOrUsername: "",
            password: "",
        },
    });

    const onSubmit = (formData: LoginForm) => {
        startTransition(() => {
            loginAction(formData)
                .then((response) => {
                    if (response?.error) {
                        toast({
                            title: "Login Gagal",
                            description: response.error,
                            variant: "destructive",
                        });
                    }
                    if (response?.success) {
                        toast({
                            title: "Berhasil Login!",
                            description: "Anda akan diarahkan ke dashboard.",
                        });
                        router.push(default_login_redirect);
                    }
                })
                .catch(() => {
                    toast({
                        title: "Login Gagal",
                        description: "Terjadi kesalahan tak terduga.",
                        variant: "destructive",
                    });
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
                        <h1 className="text-2xl font-semibold text-purple">Hai, sudah punya akun?</h1>
                        <p className="text-slate-700">Masuk ke akun yang sudah ada</p>
                    </div>

                    <FormInput
                        control={form.control}
                        name="emailOrUsername"
                        placeholder="Email atau Username"
                    />

                    <InputPassword
                        name="password"
                        placeholder="Masukkan Password"
                        control={form.control}
                    />

                    <ButtonAuth isPending={isPending} label="Masuk" type="submit" />

                    <div className="text-center text-sm">
                        <p>
                            Belum punya akun?{" "}
                            <Link href={"/auth/register"} className="font-semibold text-purple cursor-pointer">
                                Register
                            </Link>
                        </p>
                    </div>
                </form>
            </Form>
        </motion.div>
    );
}