"use server"

import { prisma } from "../../lib/prisma"

const createTransaction = async (
  jobId: string,
  studentId: string,
  employerUserId: string,
  amount: number,
  receipt: File
) => {
  try {
    const receiptImageName = ""
    const result = await prisma.transaction.create({
      data: {
        jobId,
        studentId,
        employerUserId,
        amount,
        receiptImageName,
      },
    })
    return result
  } catch (error) {
    console.error("Error in createTransaction:", error)
  }
}

export default createTransaction
