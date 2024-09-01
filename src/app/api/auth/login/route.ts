import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

// POST /api/auth/login
export async function POST(request: Request) {
  const { emailOrUsername, password } = await request.json();

  // Validate input
  if (!emailOrUsername || !password) {
    return NextResponse.json(
      { error: "Email/Username and password are required" },
      { status: 400 }
    );
  }

  try {
    // Find user by email or username
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: emailOrUsername }, { username: emailOrUsername }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email/username or password" },
        { status: 400 }
      );
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email/username or password" },
        { status: 400 }
      );
    }

    // If login is successful, return user details (excluding password)
    const { password: _, ...userData } = user;
    return NextResponse.json(userData, { status: 200 });
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json(
      { error: "Error logging in user" },
      { status: 500 }
    );
  }
}
