import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /api/tasks/complete
export async function PATCH(request: Request) {
  const { taskId: taskIdString, userId: userIdString } = await request.json();
  const taskId = Number(taskIdString);
  const userId = Number(userIdString);

  // Validate input
  if (!taskId || !userId) {
    return NextResponse.json(
      { error: "Task ID and user ID are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the task exists and is assigned to the user
    const taskAssignment = await prisma.taskAssignment.findFirst({
      where: {
        taskId,
        userId,
      },
    });

    if (!taskAssignment) {
      return NextResponse.json(
        { error: "Task not found or not assigned to the user" },
        { status: 404 }
      );
    }

    // Mark the task as completed
    const updatedAssignment = await prisma.taskAssignment.update({
      where: { id: taskAssignment.id },
      data: { completed: true },
    });

    return NextResponse.json(updatedAssignment, { status: 200 });
  } catch (error) {
    console.error("Error completing task:", error);
    return NextResponse.json(
      { error: "Error completing task" },
      { status: 500 }
    );
  }
}
