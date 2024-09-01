import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET /api/users
export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

// POST /api/users
export async function POST(request: Request) {
  const { username, email, password, role } = await request.json();

  // Validate input

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
    const newUser = await prisma.user.create({
      data: { username, email, password, role },
    });
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
