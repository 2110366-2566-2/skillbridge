-- AlterTable
ALTER TABLE "student" ADD COLUMN     "avgStar" DOUBLE PRECISION;

-- CreateTable
CREATE TABLE "ApplicationStatusLog" (
    "id" TEXT NOT NULL,
    "applicationUserId" TEXT NOT NULL,
    "applicationJobId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ApplicationStatusLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ApplicationStatusLog" ADD CONSTRAINT "ApplicationStatusLog_applicationUserId_applicationJobId_fkey" FOREIGN KEY ("applicationUserId", "applicationJobId") REFERENCES "application"("userId", "jobId") ON DELETE RESTRICT ON UPDATE CASCADE;
