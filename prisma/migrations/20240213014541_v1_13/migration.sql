/*
  Warnings:

  - You are about to drop the column `descriptionUrl` on the `job` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "job" DROP COLUMN "descriptionUrl";

-- CreateTable
CREATE TABLE "job_document_file" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "job_document_file_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "job_document_file" ADD CONSTRAINT "job_document_file_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
