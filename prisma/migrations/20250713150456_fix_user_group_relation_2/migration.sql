/*
  Warnings:

  - You are about to drop the `_UserGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserGroup" DROP CONSTRAINT "_UserGroup_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserGroup" DROP CONSTRAINT "_UserGroup_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "groupId" INTEGER;

-- DropTable
DROP TABLE "_UserGroup";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
