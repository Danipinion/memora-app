import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /api/groups/approve
export async function PATCH(request: Request) {
  const { groupId, adminId } = await request.json();

  // Validate input
  if (!Number(groupId) || !Number(adminId)) {
    return NextResponse.json(
      { error: "Group ID and admin ID are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the admin exists and is an admin
    const admin = await prisma.user.findUnique({
      where: { id: Number(adminId) },
    });

    if (!admin || admin.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Admin not found or not authorized" },
        { status: 403 }
      );
    }

    // Check if the group exists
    const group = await prisma.group.findUnique({
      where: { id: Number(groupId) },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    // Update the group's approval status
    const approvedGroup = await prisma.group.update({
      where: { id: Number(groupId) },
      data: { isApproved: true },
    });

    return NextResponse.json(approvedGroup);
  } catch (error) {
    console.error("Error approving group:", error);
    return NextResponse.json(
      { error: "Error approving group" },
      { status: 500 }
    );
  }
}
