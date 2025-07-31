"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { registerSchema } from "@/lib/form-schema";
import { prisma } from "@/prisma";

export const registerAction = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Input tidak valid!" };
  }

  const { email, password, username, number } = validatedFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  });

  if (existingUser) {
    return { error: "Email atau username sudah terdaftar!" };
  }

  try {
    await prisma.user.create({
      data: {
        username,
        email,
        number,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error("REGISTER_ERROR", error);
    return { error: "Terjadi kesalahan, gagal membuat akun." };
  }

  return { success: "Akun berhasil dibuat! Silakan login." };
};