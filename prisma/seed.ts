import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log(`Start seeding ...`);
  const user1 = await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@admin.com",
      password: "admin123",
      role: "ADMIN",
    },
  });
  const users = [];
  for (let i = 1; i <= 10; i++) {
    users.push(
      prisma.user.create({
        data: {
          username: `user${i}`,
          email: `user${i}@user.com`,
          password: "user123",
          role: "USER",
        },
      })
    );
  }
  await Promise.all(users);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
