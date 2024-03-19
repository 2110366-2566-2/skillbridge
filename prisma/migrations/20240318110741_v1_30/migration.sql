/*
  Warnings:

  - You are about to drop the column `transcriptUrl` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "student" DROP COLUMN "transcriptUrl",
ADD COLUMN     "transcriptName" TEXT;
