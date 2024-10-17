"use client";

import InputData from "@/components/organism/inputData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";
import InputPassword from "@/components/organism/inputPassword";
import { loginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { PageTransitionWhite } from "@/components/PageTransition";
import LoadingComponent from "@/components/organism/Loading";

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const title = "Hai, sudah punya akun?";
    const subtitle = "Masuk ke akun yang sudah ada";
    const subregist = "Belum punya akun?";
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            emailOrUsername: "",
            password: "",
        },
    });

    const onSubmit = async (formData: LoginForm) => {
        console.log(formData);
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                toast({
                    title: "Berhasil masuk!",
                    style: {
                        color: "#66BB6A",
                    },
                });
                setLoading(false);
                router.push("/dashboard");
            } else {
                toast({
                    title: "Gagal masuk",
                    description: "Terjadi kesalahan",
                    style: {
                        color: "#FF0000",
                    },
                });
                console.log(res);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="mx-5">
            {loading ? <LoadingComponent /> : <div>
                <div className="h-screen w-full flex flex-col items-center justify-center">
                    <div>
                        <PageTransitionWhite />
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="flex flex-col justify-center items-center h-screen"
                    >
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
                                <div className="space-y-10 mb-20 w-full">
                                    <div className="w-full mb-10 text-center">
                                        <div
                                            className="text-2xl font-semibold"
                                            style={{ color: "#6C63FF" }}
                                        >
                                            {title}
                                        </div>
                                        <div className="text-slate-700">{subtitle}</div>
                                    </div>

                                    <div className="shadow-md w-full p-10 space-y-5 text-sm text-slate-700">
                                        <InputData
                                            name="email"
                                            field={{ ...form.register("emailOrUsername") }}
                                            placeholder="Masukkan E-mail"
                                        />
                                        <InputPassword
                                            name="password"
                                            field={{ ...form.register("password") }}
                                            placeholder="Masukkan Password"
                                        />
                                    </div>
                                </div>

                                <div className="fixed bottom-10 w-full">
                                    <Button
                                        className="bg-purple p-5 w-full text-slate-100 hover:bg-slate-300"
                                    >
                                        Masuk
                                    </Button>
                                    <div className="flex justify-center gap-1 p-1 text-xs">
                                        <p>{subregist}</p>
                                        <Link
                                            href={"/register"}
                                            className="text-slate-700 font-semibold"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </motion.div>
                </div>
            </div>}
        </div>
    );
}
