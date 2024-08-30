import { PrismaClient, user } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const { username, email, fullname, password }: user = await request.json();
  //   console.log({ username, email, fullname, password });

  await prisma.user.update({
    where: { id },
    data: {
      username,
      email,
      fullname,
      password,
    },
  });

  return NextResponse.json({ msg: `User with ID ${id} updated` });
}
