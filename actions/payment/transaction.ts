"use server"

import uploadFileToS3 from "../../lib/S3/uploadFileToS3"
import { prisma } from "../../lib/prisma"
import { TransactionStatus } from "@prisma/client"

const createTransaction = async (
  jobId: string,
  studentId: string,
  employerUserId: string,
  amount: number,
  isDeposit: boolean,
  receipt: File
) => {
  try {
    const buffer = await receipt.arrayBuffer()
    const byteArray = new Uint8Array(buffer)
    const receiptImageName = await uploadFileToS3(
      byteArray,
      receipt.type,
      receipt.size,
      "/transactionFiles"
    )
    if (typeof receiptImageName !== "string") throw new Error("Error in uploading receipt")

    const newTransaction = await prisma.transaction.create({
      data: {
        jobId,
        studentId,
        employerUserId,
        amount,
        receiptImageName,
        isDeposit,
      },
    })
    // Validate receipt
    const result = await prisma.transaction.update({
      where: {
        id: newTransaction.id,
      },
      data: {
        status: TransactionStatus.ACCEPTED,
      },
    })

    return result
  } catch (error) {
    console.error("Error in createTransaction:", error)
    return null
  }
}

export default createTransaction
