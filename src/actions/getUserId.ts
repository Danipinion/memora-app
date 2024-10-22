import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";

export const getUserById = async () => {
  const prisma = new PrismaClient();
  const session = await auth();

  try {
    const user = await prisma.user.findUnique({
      where: { id: session?.user?.id },
      include: { groupInvitations: true, TaskAssignment: true },
    });

    return user;
  } catch {
    console.log("error");
  }
};
