import { NextResponse } from "next/server";
import { PrismaClient, InvitationStatus } from "@prisma/client";

const prisma = new PrismaClient();

// PATCH /api/groups/respond
export async function PATCH(request: Request) {
  const {
    invitationId: invitationIdString,
    userId: userIdString,
    response,
  } = await request.json();
  const invitationId = Number(invitationIdString);
  const userId = Number(userIdString);

  // Validate input
  if (!invitationId || !userId || !response) {
    return NextResponse.json(
      { error: "Invitation ID, user ID, and response are required" },
      { status: 400 }
    );
  }

  if (response !== "ACCEPTED" && response !== "DECLINED") {
    return NextResponse.json(
      { error: "Invalid response. It should be either ACCEPTED or DECLINED" },
      { status: 400 }
    );
  }

  try {
    // Check if the invitation exists
    const invitation = await prisma.groupInvitation.findUnique({
      where: { id: invitationId },
      include: { group: true, user: true },
    });

    if (!invitation) {
      return NextResponse.json(
        { error: "Invitation not found" },
        { status: 404 }
      );
    }

    // Ensure the invitation is for the correct user
    if (invitation.userId !== userId) {
      return NextResponse.json(
        { error: "This invitation is not for the specified user" },
        { status: 403 }
      );
    }

    // Check if the invitation status is still PENDING
    if (invitation.status !== InvitationStatus.PENDING) {
      return NextResponse.json(
        {
          error: "Invitation status is no longer pending and cannot be changed",
        },
        { status: 400 }
      );
    }

    // If the user accepts, assign them to the group and update the invitation status
    if (response === "ACCEPTED") {
      if (invitation.user.groupId) {
        return NextResponse.json(
          { error: "User is already a member of a group" },
          { status: 400 }
        );
      }

      await prisma.user.update({
        where: { id: userId },
        data: { groupId: invitation.groupId },
      });
    }

    // Update the invitation status
    const updatedInvitation = await prisma.groupInvitation.update({
      where: { id: invitationId },
      data: { status: response as InvitationStatus },
    });

    return NextResponse.json(updatedInvitation);
  } catch (error) {
    console.error("Error responding to group invitation:", error);
    return NextResponse.json(
      { error: "Error responding to group invitation" },
      { status: 500 }
    );
  }
}
