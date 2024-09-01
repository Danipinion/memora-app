import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/groups/[groupId]/details
export async function GET(
  request: Request,
  { params }: { params: { groupId: string } }
) {
  const groupId = Number(params.groupId);

  // Validate input
  if (!groupId) {
    return NextResponse.json(
      { error: "Group ID is required" },
      { status: 400 }
    );
  }

  try {
    // Fetch the group details including members, invitations, and tasks
    const group = await prisma.group.findUnique({
      where: { id: groupId },
      select: {
        id: true,
        name: true,
        members: {
          select: {
            id: true,
            username: true,
            email: true,
          },
        },
        tasks: {
          include: {
            assignments: {
              include: {
                user: true,
              },
            },
          },
        },
      },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    return NextResponse.json(group, { status: 200 });
  } catch (error) {
    console.error("Error fetching group details:", error);
    return NextResponse.json(
      { error: "Error fetching group details" },
      { status: 500 }
    );
  }
}
