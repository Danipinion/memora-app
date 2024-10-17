"use server";

import * as z from "zod";
import { AuthError } from "next-auth";

import { loginSchema } from "@/lib/form-schema";
import { signIn } from "@/auth";
import { default_login_redirect } from "@/routes";

export const login = async (data: z.infer<typeof loginSchema>) => {
  const validatedFields = loginSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      error: "Invalid Fields",
    };
  }
  const { emailOrUsername, password } = validatedFields.data;
  console.log("🚀 ~ login ~ emailOrUsername:", emailOrUsername);

  try {
    await signIn("credentials", {
      emailOrUsername,
      password,
      redirectTo: default_login_redirect,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
};
