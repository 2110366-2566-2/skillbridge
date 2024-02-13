"use server";

import prisma from "../db/prisma";

const getJobById = async (jobId: string) => {
  console.log(jobId);
  const result = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
  });

  return result;
};

export default getJobById;

// const main = async () => {
//   const jobId = "bdf21ad2-c998-4e38-85af-e888df8c6759";
//   const result = await getJobById(jobId);
//   console.log(result);
// };

// main();
