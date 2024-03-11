"use server";

import prisma from "../db/prisma";

const getEmployerPaymentHistory = async (employerUserId: string) => {
  const result = await prisma.transaction.findMany({
    where: {
      employerUserId: employerUserId,
    },
  });
  return result;
};

const getStudentPaymentHistory = async (studentId: string) => {
    const result = await prisma.transaction.findMany({
      where: {
        studentId: studentId,
      },
    });
    return result;
  };

export {getEmployerPaymentHistory, getStudentPaymentHistory};

const main = async () => {
    // Replace these with actual user or student IDs
    const employerUserId = "your-employer-user-id";
    const studentId = "your-student-id";
  
    // Get employer payment history
    const employerPaymentHistory = await getEmployerPaymentHistory(employerUserId);
    console.log("Employer Payment History:", employerPaymentHistory);
  
    // Get student payment history
    const studentPaymentHistory = await getStudentPaymentHistory(studentId);
    console.log("Student Payment History:", studentPaymentHistory);
  };
  
  main();
