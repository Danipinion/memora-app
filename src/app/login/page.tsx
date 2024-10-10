"use client";

import InputData from "@/components/organism/inputData";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import InputPassword from "@/components/organism/inputPassword";
import { loginSchema } from "@/lib/form-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { z } from "zod";
import { motion } from "framer-motion";
import { PageTransitionBlue } from "@/components/PageTransition";

export default function LoginPage() {
  const router = useRouter();
  const title = "Hai, sudah punya akun?";
  const subtitle = "Masuk ke akun yang sudah ada";
  const subregist = "Belum punya akun?";

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (val: z.infer<typeof loginSchema>) => {
    console.log(val);
  };

  return (
    <div className="mx-5">
      <PageTransitionBlue />
      <div className="h-screen w-full flex flex-col items-center justify-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
            <div className="space-y-10 mb-20 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                className="w-full mb-10 text-center"
              >
                <div
                  className="text-2xl font-semibold"
                  style={{ color: "#6C63FF" }}
                >
                  {title}
                </div>
                <div className="text-slate-700">{subtitle}</div>
              </motion.div>

              <div className="shadow-md w-full p-10 space-y-5 text-sm text-slate-700">
                <InputData
                  name="email"
                  placeholder="Masukkan E-mail"
                  {...loginSchema}
                />
                <InputPassword
                  name="password"
                  placeholder="Masukkan Password"
                  {...loginSchema}
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="fixed bottom-10 left-5 right-5"
            >
              <Button
                style={{ backgroundColor: "#6C63FF" }}
                className="p-5 w-full text-slate-100 hover:bg-slate-300"
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
            </motion.div>
          </form>
        </Form>
      </div>
    </div>
  );
}
