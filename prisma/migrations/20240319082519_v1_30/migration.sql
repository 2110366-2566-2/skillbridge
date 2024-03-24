/*
  Warnings:

  - You are about to drop the column `jobId` on the `chatroom` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[applicationUserId,applicationJobId]` on the table `chatroom` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `applicationJobId` to the `chatroom` table without a default value. This is not possible if the table is not empty.
  - Added the required column `applicationUserId` to the `chatroom` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chatroom" DROP CONSTRAINT "chatroom_jobId_fkey";

-- AlterTable
ALTER TABLE "chatroom" DROP COLUMN "jobId",
ADD COLUMN     "applicationJobId" TEXT NOT NULL,
ADD COLUMN     "applicationUserId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "chatroom_applicationUserId_applicationJobId_key" ON "chatroom"("applicationUserId", "applicationJobId");

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_applicationUserId_applicationJobId_fkey" FOREIGN KEY ("applicationUserId", "applicationJobId") REFERENCES "application"("userId", "jobId") ON DELETE RESTRICT ON UPDATE CASCADE;
