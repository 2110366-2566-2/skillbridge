/*
  Warnings:

  - You are about to drop the column `description` on the `student` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "_user" ADD COLUMN     "description" TEXT;

-- AlterTable
ALTER TABLE "student" DROP COLUMN "description";
