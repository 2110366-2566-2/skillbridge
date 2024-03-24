-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('NOT_STARTED', 'IN_PROGRESS', 'COMPLETED');

-- CreateEnum
CREATE TYPE "AppliedStatus" AS ENUM ('PENDING', 'ACCEPT', 'REJECT');

-- CreateTable
CREATE TABLE "_user" (
    "id" TEXT NOT NULL,
    "salutation" TEXT NOT NULL,
    "firstname" TEXT NOT NULL,
    "middlename" TEXT,
    "lastname" TEXT NOT NULL,
    "profileImageUrl" TEXT,
    "lineId" TEXT,
    "facebook" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "_user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "student" (
    "userId" TEXT NOT NULL,
    "resumeUrl" TEXT,
    "transcriptUrl" TEXT,
    "bankAccountNo" TEXT,
    "avgStar" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "employer" (
    "userId" TEXT NOT NULL,
    "position" TEXT NOT NULL,
    "organization" TEXT NOT NULL,
    "publicEmail" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "employer_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "job" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "status" "JobStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "description" TEXT NOT NULL,
    "budget" INTEGER NOT NULL,
    "numWorker" INTEGER NOT NULL DEFAULT 1,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "estimateStartDate" TIMESTAMP(3) NOT NULL,
    "estimateEndDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "job_tag" (
    "id" TEXT NOT NULL,
    "title" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "job_tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "applied" (
    "userId" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "bid" DOUBLE PRECISION,
    "documentUrl" TEXT,
    "status" "AppliedStatus" NOT NULL DEFAULT 'PENDING',
    "appliedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "applied_pkey" PRIMARY KEY ("userId","jobId")
);

-- CreateTable
CREATE TABLE "chatroom" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chatroom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "message" (
    "id" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "chatroomId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "unsentAt" TIMESTAMP(3),

    CONSTRAINT "message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_text" (
    "messageId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "_text_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "image" (
    "messageId" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "image_pkey" PRIMARY KEY ("messageId")
);

-- CreateTable
CREATE TABLE "transaction" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "employerId" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "paymentId" TEXT,
    "receiptImageUrl" TEXT,
    "PaymentType" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "review" (
    "id" TEXT NOT NULL,
    "jobId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "Stars" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_job_tags_relation" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_user_lineId_key" ON "_user"("lineId");

-- CreateIndex
CREATE UNIQUE INDEX "_user_facebook_key" ON "_user"("facebook");

-- CreateIndex
CREATE UNIQUE INDEX "_user_email_key" ON "_user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "student_userId_key" ON "student"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "employer_userId_key" ON "employer"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "_job_tags_relation_AB_unique" ON "_job_tags_relation"("A", "B");

-- CreateIndex
CREATE INDEX "_job_tags_relation_B_index" ON "_job_tags_relation"("B");

-- AddForeignKey
ALTER TABLE "student" ADD CONSTRAINT "student_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "employer" ADD CONSTRAINT "employer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "job" ADD CONSTRAINT "job_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applied" ADD CONSTRAINT "applied_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "applied" ADD CONSTRAINT "applied_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chatroom" ADD CONSTRAINT "chatroom_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_chatroomId_fkey" FOREIGN KEY ("chatroomId") REFERENCES "chatroom"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "message" ADD CONSTRAINT "message_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_text" ADD CONSTRAINT "_text_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image" ADD CONSTRAINT "image_messageId_fkey" FOREIGN KEY ("messageId") REFERENCES "message"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_employerId_fkey" FOREIGN KEY ("employerId") REFERENCES "employer"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "transaction" ADD CONSTRAINT "transaction_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "student"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "review" ADD CONSTRAINT "review_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_job_tags_relation" ADD CONSTRAINT "_job_tags_relation_A_fkey" FOREIGN KEY ("A") REFERENCES "job"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_job_tags_relation" ADD CONSTRAINT "_job_tags_relation_B_fkey" FOREIGN KEY ("B") REFERENCES "job_tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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

-- AlterTable
ALTER TABLE "job_tag" ALTER COLUMN "title" SET NOT NULL;