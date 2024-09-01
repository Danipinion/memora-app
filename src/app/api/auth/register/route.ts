import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// POST /api/auth/register
export async function POST(request: Request) {
  const { username, email, password, confirmPassword, role } =
    await request.json();

  // Validate input
  if (!username || !email || !password || !confirmPassword) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Password confirmation
  if (password !== confirmPassword) {
    return NextResponse.json(
      { error: "Passwords do not match" },
      { status: 400 }
    );
  }

  // Password validation
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

  // Check for existing username or email
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      {
        error: `Username ${username} or email ${email} already exists`,
      },
      { status: 400 }
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Create the user
    const newUser = await prisma.user.create({
      data: { username, email, password: hashedPassword, role },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Error creating user" }, { status: 500 });
  }
}
