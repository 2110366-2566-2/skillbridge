/*
  Warnings:

  - You are about to drop the `MailLog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TransactionDetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "MailLog" DROP CONSTRAINT "MailLog_userId_fkey";

-- DropForeignKey
ALTER TABLE "TransactionDetail" DROP CONSTRAINT "TransactionDetail_transactionId_fkey";

-- DropTable
DROP TABLE "MailLog";

-- DropTable
DROP TABLE "TransactionDetail";

-- CreateTable
CREATE TABLE "transaction_detail" (
    "transactionId" TEXT NOT NULL,
    "transRef" TEXT NOT NULL,
    "sendingBank" TEXT NOT NULL,
    "transTimestamp" TIMESTAMP(3) NOT NULL,
    "senderTHName" TEXT NOT NULL,
    "senderENName" TEXT NOT NULL,
    "senderAccountType" TEXT NOT NULL,
    "senderAccountValue" TEXT NOT NULL,
    "receiverTHName" TEXT NOT NULL,
    "receiverENName" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "qrcodeData" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transaction_detail_pkey" PRIMARY KEY ("transactionId")
);

-- CreateTable
CREATE TABLE "mail_log" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isSuccess" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "mail_log_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_detail_transactionId_key" ON "transaction_detail"("transactionId");

-- AddForeignKey
ALTER TABLE "transaction_detail" ADD CONSTRAINT "transaction_detail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "mail_log" ADD CONSTRAINT "mail_log_userId_fkey" FOREIGN KEY ("userId") REFERENCES "_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
