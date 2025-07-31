"use server";

import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getGroupDetails = async (groupId: string) => {
  const session = await auth();
  if (!session?.user?.id) {
    return null; 
  }

  const numericGroupId = Number(groupId);
  if (isNaN(numericGroupId)) {
    return null; 
  }

  try {
    const group = await prisma.group.findFirst({
      where: {
        id: numericGroupId,
        members: {
          some: {
            id: session.user.id,
          },
        },
      },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            username: true,
          },
        },
        tasks: {
          include: {
            assignments: {
              include: {
                user: {
                  select: { username: true }
                },
              },
            },
          },
        },
      },
    });

    return group; 

  } catch (error) {
    console.error("Error fetching group details:", error);
    return null;
  }
};