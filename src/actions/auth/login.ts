"use server";

import * as z from "zod";
import { AuthError } from "next-auth";
import { loginSchema } from "@/lib/form-schema";
import { signIn } from "@/auth";

export const loginAction = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: "Input tidak valid!" };
  }
  const { emailOrUsername, password } = validatedFields.data;

  try {
    await signIn("credentials", {
      emailOrUsername,
      password,
    });

  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email atau password salah." };
        default:
          return { error: "Terjadi kesalahan." };
      }
    }
    throw error;
  }
  
  return { success: "Login berhasil!" };
};