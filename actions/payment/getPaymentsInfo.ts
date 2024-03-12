"use server"

import { prisma } from "../../lib/prisma"

const getPaymentsInfo = async (jobId: string) => {
  try {
    const result = await prisma.application.findMany({
      where: {
        jobId: jobId,
        isDeleted: false,
        // OR: [
        //   {
        //     status: "DEPOSIT_PENDING",
        //   },
        //   {
        //     status: "WAGE_PAYMENT_PENDING",
        //   },
        // ],
        // testing purpose
      },
      include: {
        user: {
          select: {
            salutation: true,
            firstname: true,
            middlename: true,
            lastname: true,
            profileImageUrl: true,
            student: {
              select: {
                bankAccountNo: true,
              },
            },
          },
        },
      },
    })
    return result
  } catch (error) {
    console.error("Error in getPaymentsInfo:", error)
    return null
  }
}

export default getPaymentsInfo
