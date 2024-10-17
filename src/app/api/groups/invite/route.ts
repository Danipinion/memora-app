import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST /api/groups/invite
export async function POST(request: Request) {
  const {
    groupId: groupIdString,
    username,
    inviterId: inviterIdString,
  } = await request.json();
  const groupId = Number(groupIdString);
  const inviterId = inviterIdString;

  // Validate input
  if (!groupId || !username || !inviterId) {
    return NextResponse.json(
      { error: "Group ID, username, and inviter ID are required" },
      { status: 400 }
    );
  }

  try {
    // Check if the inviter exists and is the group creator
    const inviter = await prisma.user.findUnique({
      where: { id: inviterId },
    });

    if (!inviter) {
      return NextResponse.json({ error: "Inviter not found" }, { status: 404 });
    }

    // Check if the group exists and is approved
    const group = await prisma.group.findUnique({
      where: { id: groupId },
    });

    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    if (!group.isApproved) {
      return NextResponse.json(
        { error: "Group is not approved" },
        { status: 400 }
      );
    }

    // Check if the inviter is the creator of the group
    if (group.creatorId != inviterId) {
      return NextResponse.json(
        { error: "Only the group creator can invite users" },
        { status: 403 }
      );
    }

    // Check if the user to be invited exists
    const invitedUser = await prisma.user.findUnique({
      where: { username },
    });

    if (!invitedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the invited user is already in a group
    if (invitedUser.groupId) {
      return NextResponse.json(
        { error: "User is already in a group" },
        { status: 400 }
      );
    }

    // Check if there's already a pending or accepted invitation for this user to this group
    const existingInvitation = await prisma.groupInvitation.findFirst({
      where: {
        groupId,
        userId: invitedUser.id,
        status: { in: ["PENDING", "ACCEPTED"] },
      },
    });

    if (existingInvitation) {
      return NextResponse.json(
        {
          error:
            "User already has a pending or accepted invitation to this group",
        },
        { status: 400 }
      );
    }

    // Create a new invitation
    const invitation = await prisma.groupInvitation.create({
      data: {
        groupId,
        userId: invitedUser.id,
        status: "PENDING",
      },
    });

    return NextResponse.json(invitation, { status: 201 });
  } catch (error) {
    console.error("Error inviting user:", error);
    return NextResponse.json({ error: "Error inviting user" }, { status: 500 });
  }
}
