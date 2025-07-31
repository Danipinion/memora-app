import { auth } from "@/auth";
import { prisma } from "@/prisma";

export const getGroups = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    return [];
  }

  try {
    const groups = await prisma.group.findMany({
      where: {
        members: {
          some: {
            id: session.user.id,
          },
        },
      },
      include: {
        _count: {
          select: {
            members: true,
            tasks: true,
          },
        },
        creator: {
          select: {
            id: true,
            username: true,
          }
        }
      },
      orderBy: {
        createdAt: 'desc', 
      }
    });

    return groups;

  } catch (error) {
    console.error("Error fetching groups:", error);
    throw new Error("Gagal mengambil data grup.");
  }
};