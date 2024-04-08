"use server";

import { prisma } from "../../lib/prisma";

const getEmployerInfoById = async (userId: string) => {
  const result = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    include: {
      employer: true,
    },
  });

  return result;
};

const getStudentName = async (userId: string) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      select: {
        salutation: true,
        firstname: true,
        lastname: true,
      },
    });
    return result;
  } catch (err) {
    console.log("Error fetching student name");
  }
};

const getStudentInfoById = async (userId: string) => {
  try {
    const result = await prisma.user.findFirst({
      where: {
        id: userId,
      },
      include: {
        student: true,
      },
    });

    return result;
  } catch (err) {
    console.log("Error fetching student info");
    return null;
  }
};

export { getEmployerInfoById, getStudentName, getStudentInfoById };

// const main = async () => {
//   const jobId = "bdf21ad2-c998-4e38-85af-e888df8c6759";
//   const result = await getJobById(jobId);
//   console.log(result);
// };

// main();
