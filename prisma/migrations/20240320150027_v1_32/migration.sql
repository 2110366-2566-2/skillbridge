/*
  Warnings:

  - You are about to drop the column `avgStar` on the `student` table. All the data in the column will be lost.
  - Added the required column `employerId` to the `chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "chatroom" ADD COLUMN     "employerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "avgStar";

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_applicationUserId_fkey" FOREIGN KEY ("applicationUserId") REFERENCES "student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
