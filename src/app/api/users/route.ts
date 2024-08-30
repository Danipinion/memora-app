import { PrismaClient, user } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users);
}

async function POST(request: Request) {
  const { username, email, fullname, password }: user = await request.json();

  await prisma.user.create({
    data: {
      username,
      email,
      fullname,
      password,
    },
  });
  return NextResponse.json({ msg: "User created" });
}

// async function PUT(request: Request) {
//   const url = new URL(request.url);
//   const id = Number(url.searchParams.get("id"));
//   //   await prisma.user.update({
//   //     where: {
//   //       id: 1,
//   //     },
//   //     data: {
//   //       username: "johndoe updated",
//   //       email: "johndoe@example.com",
//   //       fullname: "John Doe",
//   //       password: "password123",
//   //     },
//   //   });
//   return Response.json({ msg: "User updated" });
// }

async function DELETE() {
  const user = await prisma.user.delete({
    where: {
      id: 1,
    },
  });
  return Response.json({ msg: "User deleted" });
}

export { GET, POST, DELETE };
