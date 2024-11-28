import { auth } from "@/auth";
import { PrismaClient } from "@prisma/client";
import { NextApiResponse } from "next";

export const getTasks = async () => {
  const prisma = new PrismaClient();
  const session = await auth();

  try {
    const tasks = await prisma.task.findMany();
    return tasks;
} catch (error) {
    console.error("Error fetching data:", error);
}
};
