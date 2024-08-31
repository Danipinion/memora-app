import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
