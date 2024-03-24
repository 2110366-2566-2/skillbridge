/*
  Warnings:

  - You are about to drop the column `unsentAt` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `message` table. All the data in the column will be lost.
  - You are about to drop the column `resumeUrl` on the `student` table. All the data in the column will be lost.
  - You are about to drop the `_text` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `content` to the `message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isImage` to the `message` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_text" DROP CONSTRAINT "_text_messageId_fkey";

-- DropForeignKey
ALTER TABLE "image" DROP CONSTRAINT "image_messageId_fkey";

-- AlterTable
ALTER TABLE "message" DROP COLUMN "unsentAt",
DROP COLUMN "updatedAt",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "isImage" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "resumeUrl",
ADD COLUMN     "resumeName" TEXT;

-- DropTable
DROP TABLE "_text";

-- DropTable
DROP TABLE "image";

-- AlterTable
ALTER TABLE "student" DROP COLUMN "transcriptUrl",
ADD COLUMN     "transcriptName" TEXT;

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

