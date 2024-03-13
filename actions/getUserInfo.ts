"use server";

import { prisma } from "../lib/prisma";

const getEmployerInfoById = async (userId: string) => {
  const result = await prisma.employer.findFirst({
    where: {
      userId: userId,
    },
  });

  return result;
};

export default getEmployerInfoById;

// const main = async () => {
//   const jobId = "bdf21ad2-c998-4e38-85af-e888df8c6759";
//   const result = await getJobById(jobId);
//   console.log(result);
// };

// main();
