/*
  Warnings:

  - You are about to drop the column `timestamp` on the `message` table. All the data in the column will be lost.
  - You are about to drop the `_job_tags_relation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `applied` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `hashedPassword` to the `_user` table without a default value. This is not possible if the table is not empty.
  - Made the column `email` on table `_user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `jobTagId` to the `job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `studentId` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- DropForeignKey
ALTER TABLE "_job_tags_relation" DROP CONSTRAINT "_job_tags_relation_A_fkey";

-- DropForeignKey
ALTER TABLE "_job_tags_relation" DROP CONSTRAINT "_job_tags_relation_B_fkey";

-- DropForeignKey
ALTER TABLE "applied" DROP CONSTRAINT "applied_jobId_fkey";

-- DropForeignKey
ALTER TABLE "applied" DROP CONSTRAINT "applied_userId_fkey";

-- AlterTable
ALTER TABLE "_user" ADD COLUMN     "hashedPassword" VARCHAR(512) NOT NULL,
ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isGmail" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "email" SET NOT NULL;

-- AlterTable
ALTER TABLE "job" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "jobTagId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "job_tag" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "message" DROP COLUMN "timestamp";

-- AlterTable
ALTER TABLE "review" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "studentId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "transaction" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "_job_tags_relation";

-- DropTable
DROP TABLE "applied";

-- DropEnum
DROP TYPE "AppliedStatus";

-- CreateTable
CREATE TABLE "application" (
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "bid" DOUBLE PRECISION NOT NULL,
    "documentUrl" TEXT,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "application_pkey" PRIMARY KEY ("userId","jobId")
);

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_jobTagId_fkey" FOREIGN KEY ("jobTagId") REFERENCES "job_tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "application" ADD CONSTRAINT "application_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
