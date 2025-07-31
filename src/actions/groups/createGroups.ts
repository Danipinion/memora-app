"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const createGroup = async (groupName: string) => {
  const session = await auth();

  // Pastikan hanya pengguna yang sudah login yang bisa membuat grup
  if (!session?.user?.id) {
    return { error: "Akses ditolak. Silakan login terlebih dahulu." };
  }

  const userId = session.user.id;

  try {
    const newGroup = await prisma.group.create({
      data: {
        name: groupName,
        creatorId: userId, 
        members: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return { success: `Grup "${newGroup.name}" berhasil dibuat!` };

  } catch (error) {
    console.error("CREATE_GROUP_ERROR:", error);
    return { error: "Terjadi kesalahan pada server, gagal membuat grup." };
  }
};