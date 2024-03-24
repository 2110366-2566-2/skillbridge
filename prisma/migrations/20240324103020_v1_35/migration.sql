/*
  Warnings:

  - You are about to drop the `ApplicationStatusLog` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ApplicationStatusLog" DROP CONSTRAINT "ApplicationStatusLog_applicationUserId_applicationJobId_fkey";

-- DropTable
DROP TABLE "ApplicationStatusLog";

-- CreateTable
CREATE TABLE "application_status_log" (
    "id" TEXT NOT NULL,
    "applicationUserId" TEXT NOT NULL,
    "applicationJobId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "application_status_log_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "application_status_log" ADD CONSTRAINT "application_status_log_applicationUserId_applicationJobId_fkey" FOREIGN KEY ("applicationUserId", "applicationJobId") REFERENCES "application"("userId", "jobId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddUUIDExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AddTrigger
CREATE OR REPLACE FUNCTION update_application_status_log()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO application_status_log (id, "applicationUserId", "applicationJobId", status, "updatedAt")
  VALUES (uuid_generate_v4(), NEW."userId", NEW."jobId", NEW.status, NOW());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER update_application_status_log
AFTER UPDATE OF status ON application
FOR EACH ROW
EXECUTE PROCEDURE update_application_status_log();