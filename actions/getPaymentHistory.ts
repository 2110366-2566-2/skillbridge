"use server";

import { prisma } from "../lib/prisma";

const getUserTransactionMonthsAndYears = async (userId: string) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        OR: [
          { employerUserId: userId },
          { studentId: userId },
        ],
      },
      distinct: ["updatedAt"],
      orderBy: {
        updatedAt: "asc",
      },
    });

    // Extract unique months and years from updatedAt timestamps
    const uniqueMonthsAndYears = result.map((transaction) => {
      const updatedAtDate = new Date(transaction.updatedAt);
      return {
        year: updatedAtDate.getFullYear(),
        month: updatedAtDate.getMonth() + 1, // Months are zero-indexed in JavaScript
      };
    });

    // Deduplicate the array of months and years
    const deduplicatedMonthsAndYears = Array.from(
      new Set(uniqueMonthsAndYears.map((item) => JSON.stringify(item)))
    ).map((str) => JSON.parse(str));

    return deduplicatedMonthsAndYears;
  } catch (error: any) {
    console.error(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};


interface PaymentHistoryInput {
  userId: string;
  year?: number;
  month?: number;
}

const getUserPaymentHistory = async ({ userId, year, month }: PaymentHistoryInput) => {
  try {
    const whereCondition: any = {
      OR: [
        { employerUserId: userId },
        { studentId: userId },
      ],
    };

    if (year && month) {
      whereCondition.updatedAt = {
        gte: new Date(year, month - 1, 1), // Starting from the first day of the specified month
        lt: new Date(year, month, 1), // Up to the first day of the next month
      };
    }

    const result = await prisma.transaction.findMany({
      where: whereCondition,
    });

    return result;
  } catch (error: any) {
    console.error(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export { getUserPaymentHistory, getUserTransactionMonthsAndYears };

// const main = async () => {
//   // Example usage without specifying year and month
//   const userIdWithoutDate = "6945f76a-8a1b-404b-8b0c-ebd2be1aca29";
//   const userPaymentHistoryWithoutDate = await getUserPaymentHistory({ userId: userIdWithoutDate });
//   console.log("userPaymentHistoryWithoutDate : ", userPaymentHistoryWithoutDate);

//   // Example usage with specifying year and month
//   const userIdWithDate = "6945f76a-8a1b-404b-8b0c-ebd2be1aca29";
//   const userPaymentHistoryWithDate = await getUserPaymentHistory({
//     userId: userIdWithDate,
//     year: 2024,
//     month: 3,
//   });
//   console.log("userPaymentHistoryWithDate :" ,userPaymentHistoryWithDate);

//   const userId = "6945f76a-8a1b-404b-8b0c-ebd2be1aca29";
//   const userTransactionMonthsAndYears = await getUserTransactionMonthsAndYears(userId);
//   console.log("serTransactionMonthsAndYears : ",userTransactionMonthsAndYears);
// };

// main();
