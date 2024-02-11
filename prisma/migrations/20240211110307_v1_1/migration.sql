/*
  Warnings:

  - Made the column `title` on table `job_tag` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "job_tag" ALTER COLUMN "title" SET NOT NULL;
