-- CreateTable
CREATE TABLE "TransactionDetail" (
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
    "receiverAccountType" TEXT NOT NULL,
    "receiverAccountValue" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "qrcodeData" TEXT NOT NULL,

    CONSTRAINT "TransactionDetail_pkey" PRIMARY KEY ("transactionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TransactionDetail_transactionId_key" ON "TransactionDetail"("transactionId");

-- AddForeignKey
ALTER TABLE "TransactionDetail" ADD CONSTRAINT "TransactionDetail_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "transaction"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
