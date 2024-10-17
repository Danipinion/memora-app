import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/tasks/view
export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const groupId = Number(url.searchParams.get("groupId"));

  if (!userId && !groupId) {
    return NextResponse.json(
      { error: "User ID or Group ID is required" },
      { status: 400 }
    );
  }

  try {
    let tasks;

    if (userId) {
      // Retrieve tasks assigned to the user
      tasks = await prisma.taskAssignment.findMany({
        where: { userId },
        include: { task: true },
      });
    } else if (groupId) {
      // Retrieve tasks for the group
      tasks = await prisma.task.findMany({
        where: { groupId },
      });
    }

    return NextResponse.json(tasks, { status: 200 });
  } catch (error) {
    console.error("Error retrieving tasks:", error);
    return NextResponse.json(
      { error: "Error retrieving tasks" },
      { status: 500 }
    );
  }
}
