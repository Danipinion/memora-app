"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getUserById = async () => {
  try {
    const session = await auth();
    const userId = session?.user?.id;

    if (!userId) {
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        number: true,
        createdAt: true,
        role: true
      }
    });

    return user;

  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return null;
  }
};