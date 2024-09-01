import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { name, creatorId } = await request.json();

  // Validate input
  if (!name || !Number(creatorId)) {
    return NextResponse.json(
      { error: "Group name and creator ID are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the user exists
    const user = await prisma.user.findUnique({
      where: { id: Number(creatorId) },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the user is currently in a group
    if (user.groupId) {
      return NextResponse.json(
        { error: "User is already in a group" },
        { status: 400 }
      );
    }

    // Create a new group
    const newGroup = await prisma.group.create({
      data: {
        name,
        creator: { connect: { id: Number(creatorId) } },
        isApproved: false,
      },
    });

    // Update the user's current group
    await prisma.user.update({
      where: { id: Number(creatorId) },
      data: { groupId: newGroup.id },
    });

    return NextResponse.json(newGroup, { status: 201 });
  } catch (error) {
    console.error("Error creating group:", error);
    return NextResponse.json(
      { error: "Error creating group" },
      { status: 500 }
    );
  }
}

// GET /api/groups/{groupId}/members
export async function GET(
  request: Request,
  { params }: { params: { groupId: string } }
) {
  const { groupId } = params;
  const groupIdNumber = Number(groupId);

  // Validate input
  if (!groupIdNumber) {
    return NextResponse.json(
      { error: "Group ID is required" },
      { status: 400 }
    );
  }

  try {
    // Check if the group exists
    const group = await prisma.group.findUnique({
      where: { id: groupIdNumber },
      include: {
        members: {
          select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Return the list of members
    return NextResponse.json(group.members, { status: 200 });
  } catch (error) {
    console.error("Error retrieving group members:", error);
    return NextResponse.json(
      { error: "Error retrieving group members" },
      { status: 500 }
    );
  }
}
