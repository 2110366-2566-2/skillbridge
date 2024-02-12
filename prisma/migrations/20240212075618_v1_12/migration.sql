-- AlterTable
ALTER TABLE "job" ADD COLUMN     "descriptionUrl" TEXT,
ALTER COLUMN "description" DROP NOT NULL;
