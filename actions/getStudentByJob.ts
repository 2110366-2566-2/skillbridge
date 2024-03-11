"use server";

import prisma from "../db/prisma";

const getStudentByJob = async (jobId: string) => {
  console.log(jobId);
  const result = await prisma.application.findMany({
    where: {
      jobId: jobId,
    },
    include: {
      user: true,
    },
  });

  return result;
};

export default getStudentByJob;

// const main = async () => {
//   const jobId = "bdf21ad2-c998-4e38-85af-e888df8c6759";
//   const result = await getStudentByJob(jobId);
//   console.log(result);
// };

// main();
