/*
  Warnings:

  - You are about to drop the column `loginEmail` on the `Employer` table. All the data in the column will be lost.
  - You are about to drop the column `bankAccount` on the `Student` table. All the data in the column will be lost.
  - You are about to drop the column `publicEmail` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `publicEmail` to the `Employer` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_publicEmail_key";

-- AlterTable
ALTER TABLE "Employer" DROP COLUMN "loginEmail",
ADD COLUMN     "publicEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Student" DROP COLUMN "bankAccount",
ADD COLUMN     "bankAccountName" TEXT,
ADD COLUMN     "bankAccountNo" TEXT;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "publicEmail",
ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
