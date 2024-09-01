import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/tasks/create
export async function POST(request: Request) {
  const {
    title,
    description,
    deadline,
    groupId: groupIdString,
    userId: userIdString,
  } = await request.json();
  const groupId = groupIdString ? Number(groupIdString) : null;
  const userId = Number(userIdString);

  // Validate input
  if (!title || !description || !deadline || userId === undefined) {
    return NextResponse.json(
      { error: "Title, description, deadline, and user ID are required" },
      { status: 400 }
    );
  }

  try {
    // Create the task
    const taskData: any = {
      title,
      description,
      deadline: new Date(deadline),
      completed: false,
    };

    if (groupId) {
      taskData.group = { connect: { id: groupId } };
    }

    const task = await prisma.task.create({
      data: taskData,
    });

    // If the task is part of a group, assign it to all group members
    if (groupId) {
      const group = await prisma.group.findUnique({ where: { id: groupId } });

      if (!group) {
        return NextResponse.json({ error: "Group not found" }, { status: 404 });
      }

      const members = await prisma.user.findMany({
        where: { groupId },
      });

      const assignments = members.map((member) => ({
        taskId: task.id,
        userId: member.id,
      }));

      await prisma.taskAssignment.createMany({
        data: assignments,
      });
    } else {
      // Assign the task to the user who created it if it's a personal task
      await prisma.taskAssignment.create({
        data: {
          taskId: task.id,
          userId: userId,
        },
      });
    }

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Error creating task:", error);
    return NextResponse.json({ error: "Error creating task" }, { status: 500 });
  }
}
