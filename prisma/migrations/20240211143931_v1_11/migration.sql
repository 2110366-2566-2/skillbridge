/*
  Warnings:

  - You are about to drop the column `Stars` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `PaymentType` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `stars` to the `review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "review" DROP COLUMN "Stars",
ADD COLUMN     "stars" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "transaction" DROP COLUMN "PaymentType",
ADD COLUMN     "paymentType" TEXT;
