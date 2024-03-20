"use server";

import { prisma } from "../../lib/prisma";

const getPaymentInfo = async (jobId: string, userId: string) => {
  try {
    const result = await prisma.application.findUnique({
      where: {
        userId_jobId: {
          jobId,
          userId,
        },
        isDeleted: false,
        OR: [
          {
            status: "DEPOSIT_PENDING",
          },
          {
            status: "WAGE_PAYMENT_PENDING",
          },
        ],
      },
      include: {
        user: {
          select: {
            salutation: true,
            firstname: true,
            middlename: true,
            lastname: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return result;
  } catch (error) {
    console.error("Error in getPaymentInfo:", error);
    return null;
  }
};

const getAllPaymentInfo = async (jobId: string) => {
  try {
    const results = await prisma.application.findMany({
      where: {
        jobId,
        isDeleted: false,
        OR: [
          {
            status: "DEPOSIT_PENDING",
          },
          {
            status: "WAGE_PAYMENT_PENDING",
          },
        ],
      },
      include: {
        user: {
          select: {
            salutation: true,
            firstname: true,
            middlename: true,
            lastname: true,
            profileImageUrl: true,
          },
        },
      },
    });

    return results;
  } catch (error) {
    console.error("Error in getAllPaymentInfo:", error);
    return null;
  }
};

export { getAllPaymentInfo, getPaymentInfo };
