"use server"

import { prisma } from "../../lib/prisma"

const getPaymentInfo = async (jobId: string, userId: string) => {
  try {
    const result = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          userId: userId,
          jobId: jobId,
        },
        isDeleted: false,
      },
      include: {
        user: {
          select: {
            salutation: true,
            firstname: true,
            middlename: true,
            lastname: true,
            profileImageUrl: true,
            lineId: true,
            facebook: true,
            email: true,
          },
        },
      },
    })
    return result
  } catch (error) {
    console.error("Error in getPaymentInfo:", error)
  }
}

export default getPaymentInfo
