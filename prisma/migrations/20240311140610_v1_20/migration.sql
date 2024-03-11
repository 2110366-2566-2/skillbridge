/*
  Warnings:

  - You are about to drop the column `documentUrl` on the `application` table. All the data in the column will be lost.
  - You are about to drop the column `fileUrl` on the `job_document_file` table. All the data in the column will be lost.
  - You are about to drop the column `paymentId` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `paymentType` on the `transaction` table. All the data in the column will be lost.
  - You are about to drop the column `receiptImageUrl` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `fileName` to the `job_document_file` table without a default value. This is not possible if the table is not empty.
  - Added the required column `receiptImageName` to the `transaction` table without a default value. This is not possible if the table is not empty.
  - Made the column `employerUserId` on table `transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ApplicationStatus" ADD VALUE 'DEPOSIT_PENDING';
ALTER TYPE "ApplicationStatus" ADD VALUE 'IN_PROGRESS';
ALTER TYPE "ApplicationStatus" ADD VALUE 'DELIVERED';
ALTER TYPE "ApplicationStatus" ADD VALUE 'WAGE_PAYMENT_PENDING';
ALTER TYPE "ApplicationStatus" ADD VALUE 'DONE';
ALTER TYPE "ApplicationStatus" ADD VALUE 'CANCELED';

-- DropForeignKey
ALTER TABLE "transaction" DROP CONSTRAINT "transaction_employerUserId_fkey";

-- AlterTable
ALTER TABLE "application" DROP COLUMN "documentUrl",
ADD COLUMN     "isAcknowledged" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "job_document_file" DROP COLUMN "fileUrl",
ADD COLUMN     "fileName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "paymentId",
DROP COLUMN "paymentType",
DROP COLUMN "receiptImageUrl",
ADD COLUMN     "amount" DOUBLE PRECISION,
ADD COLUMN     "receiptImageName" TEXT NOT NULL,
ADD COLUMN     "status" "TransactionStatus" NOT NULL DEFAULT 'PENDING',
ALTER COLUMN "employerUserId" SET NOT NULL;

-- CreateTable
CREATE TABLE "application_document_file" (
    "id" TEXT NOT NULL,
    "applicationUserId" TEXT NOT NULL,
    "applicationJobId" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_document_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "application_document_file" ADD CONSTRAINT "application_document_file_applicationUserId_applicationJob_fkey" FOREIGN KEY ("applicationUserId", "applicationJobId") REFERENCES "application"("userId", "jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_employerUserId_fkey" FOREIGN KEY ("employerUserId") REFERENCES "employer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
