/*
  Warnings:

  - The values [DELIVERED] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `isDeposit` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED', 'DEPOSIT_PENDING', 'IN_PROGRESS', 'WAGE_PAYMENT_PENDING', 'DONE', 'CANCELED', 'DISCLAIMED');
ALTER TABLE "application" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "application" ALTER COLUMN "status" TYPE "ApplicationStatus_new" USING ("status"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "ApplicationStatus_old";
ALTER TABLE "application" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "isDeposit" BOOLEAN NOT NULL;

-- CreateTable
CREATE TABLE "MailLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MailLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MailLog" ADD CONSTRAINT "MailLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
