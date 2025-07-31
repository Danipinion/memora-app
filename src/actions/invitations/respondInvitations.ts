"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

type ResponseStatus = "ACCEPTED" | "DECLINED";

export const respondToInvitation = async (
  invitationId: number,
  status: ResponseStatus
) => {
  const session = await auth();
  const currentUserId = session?.user?.id;

  if (!currentUserId) {
    return { error: "Akses ditolak." };
  }

  const invitation = await prisma.groupInvitation.findFirst({
    where: {
      id: invitationId,
      userId: currentUserId, 
    },
  });

  if (!invitation) {
    return { error: "Undangan tidak ditemukan atau bukan untuk Anda." };
  }

  if (status === "DECLINED") {
    await prisma.groupInvitation.delete({ where: { id: invitationId } });
    return { success: "Undangan telah ditolak." };
  }

  if (status === "ACCEPTED") {
    try {
      await prisma.$transaction([
        prisma.group.update({
          where: { id: invitation.groupId },
          data: { members: { connect: { id: currentUserId } } },
        }),
        prisma.groupInvitation.delete({ where: { id: invitationId } }),
      ]);
      return { success: "Anda telah bergabung dengan grup!" };
    } catch (error) {
      return { error: "Gagal bergabung dengan grup." };
    }
  }
};