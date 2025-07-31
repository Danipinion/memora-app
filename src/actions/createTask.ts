"use server";

import * as z from "zod";
import { auth } from "@/auth";
import { taskSchema } from "@/lib/form-schema";
import { prisma } from "@/prisma";

export const createTask = async (values: z.infer<typeof taskSchema>) => {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "Akses ditolak." };
  }

  const validatedFields = taskSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Input tidak valid." };
  }

  const { title, description, deadline, groupId, assignedUserIds } = validatedFields.data;

  try {
    const groupMembership = await prisma.group.findFirst({
      where: {
        id: groupId,
        members: { some: { id: session.user.id } },
      },
    });

    if (!groupMembership) {
      return { error: "Anda bukan anggota dari grup ini." };
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        deadline,
        groupId,
        assignments: {
          create: assignedUserIds.map((userId) => ({
            userId: userId,
          })),
        },
      },
    });

    return { success: `Tugas "${task.title}" berhasil dibuat.` };
  } catch (error) {
    console.error("CREATE_TASK_ERROR:", error);
    return { error: "Gagal membuat tugas." };
  }
};