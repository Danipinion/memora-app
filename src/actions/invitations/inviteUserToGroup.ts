"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const inviteUserToGroup = async (
  groupId: number,
  invitedUsername: string
) => {
  const session = await auth();
  const inviterId = session?.user?.id; 

  if (!inviterId) {
    return { error: "Akses ditolak. Anda harus login." };
  }

  const groupMembership = await prisma.group.findFirst({
    where: { id: groupId, members: { some: { id: inviterId } } },
    include: { members: true },
  });

  if (!groupMembership) {
    return { error: "Otorisasi gagal. Anda bukan anggota grup ini." };
  }

  const userToInvite = await prisma.user.findUnique({
    where: { username: invitedUsername },
  });

  if (!userToInvite) {
    return { error: `Pengguna "${invitedUsername}" tidak ditemukan.` };
  }

  try {
    await prisma.groupInvitation.create({
      data: {
        groupId: groupId,
        userId: userToInvite.id, 
      },
    });
    return { success: `Undangan telah dikirim ke "${invitedUsername}".` };
  } catch (error) {
    console.error("INVITE_USER_ERROR:", error);
    return { error: "Gagal mengirim undangan." };
  }
};