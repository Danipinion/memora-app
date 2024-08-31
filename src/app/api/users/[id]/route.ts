import { PrismaClient, User } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
  }
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { groupInvitations: true },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}

async function PATCH(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  console.log("🚀 ~ PATCH ~ id:", id);
  const { username, email, password, role }: User = await request.json();

  if (!username || !email || !password) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      {
        error:
          "Password must be at least 8 characters and contain at least one lowercase letter, one uppercase letter, one number, and one special character",
      },
      { status: 400 }
    );
  }

  const userWithSameUsername = await prisma.user.findFirst({
    where: { username },
  });
  const userWithSameEmail = await prisma.user.findFirst({
    where: { email },
  });
  if (userWithSameUsername || userWithSameEmail) {
    return NextResponse.json(
      {
        error: `Username ${username} or email ${email} already exists`,
      },
      { status: 400 }
    );
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(id) },
      data: { username, email, password, role },
    });
    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json({ error: "Error updating user" }, { status: 500 });
  }
}

async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  try {
    await prisma.user.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting user" }, { status: 500 });
  }
}

export { PATCH, DELETE };
