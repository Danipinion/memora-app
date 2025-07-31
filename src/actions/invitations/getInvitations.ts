"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getMyInvitations = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return [];
  }

  try {
    const invitations = await prisma.groupInvitation.findMany({
      where: {
        userId: session.user.id, 
        status: "PENDING",
      },
      include: {
        group: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        invitedAt: 'desc',
      }
    });

    return invitations;
  } catch (error) {
    console.error("Error fetching invitations:", error);
    return [];
  }
};