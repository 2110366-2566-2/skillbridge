/*
  Warnings:

  - You are about to drop the column `userId` on the `job` table. All the data in the column will be lost.
  - You are about to drop the column `employerId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `employerId` to the `job` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "job" DROP CONSTRAINT "job_userId_fkey";

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_employerId_fkey";

-- AlterTable
ALTER TABLE "job" DROP COLUMN "userId",
ADD COLUMN     "employerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "employerId",
ADD COLUMN     "employerUserId" TEXT;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_employerUserId_fkey" FOREIGN KEY ("employerUserId") REFERENCES "employer"("userId") ON DELETE SET NULL ON UPDATE CASCADE;
