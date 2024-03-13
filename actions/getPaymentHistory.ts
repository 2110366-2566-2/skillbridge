"use server";

import { getStudentName } from "./getUserInfo";
import { prisma } from "../lib/prisma";

interface PaymentHistoryInput {
  userId: string;
  year?: number;
  month?: number;
}

const getUserTransactionMonthsAndYears = async (userId: string) => {
  try {
    const result = await prisma.transaction.findMany({
      where: {
        OR: [{ employerUserId: userId }, { studentId: userId }],
      },
      distinct: ["createdAt"],
      orderBy: {
        createdAt: "desc",
      },
    });

    // Extract unique months and years from createdAt timestamps
    const uniqueMonthsAndYears = result.map((transaction) => {
      const createdAtDate = new Date(transaction.createdAt);
      return {
        year: createdAtDate.getFullYear(),
        month: createdAtDate.getMonth() + 1, // Months are zero-indexed in JavaScript
      };
    });

    // Deduplicate the array of months and years
    const deduplicatedMonthsAndYears = Array.from(
      new Set(uniqueMonthsAndYears.map((item) => JSON.stringify(item))),
    ).map((str) => JSON.parse(str));

    return deduplicatedMonthsAndYears;
  } catch (error: any) {
    console.error(error);
  }
};

const getUserPaymentHistory = async ({
  userId,
  year,
  month,
}: PaymentHistoryInput) => {
  try {
    const whereCondition: any = {
      OR: [{ employerUserId: userId }, { studentId: userId }],
    };

    if (year && month) {
      whereCondition.createdAt = {
        gte: new Date(year, month - 1, 1),
        lt: new Date(year, month, 1),
      };
    }

    let result = await prisma.transaction.findMany({
      where: whereCondition,
      include: {
        job: {
          select: {
            title: true,
          },
        },
      },
    });

    // Add the "isStudent" field to each transaction in the result
    const resultWithIsStudent = await Promise.all(
      result.map(async (transaction) => {
        const studentName = await getStudentName(transaction.studentId);
        return {
          ...transaction,
          isStudent: transaction.studentId === userId,
          studentName: studentName,
        };
      }),
    );
    return resultWithIsStudent;
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
//   const userIdWithoutDate = "45f2b0d1-1a44-4028-836e-c1da532a3cab";
//   const userPaymentHistoryWithoutDate = await getUserPaymentHistory({
//     userId: userIdWithoutDate,
//   });
//   console.log(
//     "userPaymentHistoryWithoutDate : ",
//     userPaymentHistoryWithoutDate,
//   );

//   // Example usage with specifying year and month
//   const userIdWithDate = "4839bedf-5cdd-4d8a-b0b2-93849e585d15";
//   const userPaymentHistoryWithDate = await getUserPaymentHistory({
//     userId: userIdWithDate,
//     year: 2023,
//     month: 11,
//   });
//   console.log("userPaymentHistoryWithDate :", userPaymentHistoryWithDate);

//   const userId = "4839bedf-5cdd-4d8a-b0b2-93849e585d15";
//   const userTransactionMonthsAndYears =
//     await getUserTransactionMonthsAndYears(userId);
//   console.log("serTransactionMonthsAndYears : ", userTransactionMonthsAndYears);
// };

// main();
