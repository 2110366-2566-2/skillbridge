/*
  Warnings:

  - A unique constraint covering the columns `[transRef]` on the table `transaction_detail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "transaction_detail_transRef_key" ON "transaction_detail"("transRef");
