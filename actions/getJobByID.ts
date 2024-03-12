"use server";

import { prisma } from "../lib/prisma";

const getJobById = async (jobId: string) => {
  try {
    const result = await prisma.job.findFirst({
      where: {
        id: jobId,
      },
      include: {
        jobTag: true,
      },
    });
    return result;
  } catch (error) {
    console.error("Error in getJobById:", error);
    return null;
  }
};

export default getJobById;

// const main = async () => {
//   try {
//     const jobId = "13d5b60d-332f-4b8a-8024-b12ebc8ea559";
//     const result = await getJobById(jobId);
//     console.log(result);
//   } catch (error) {
//     console.error("Error in main:", error);
//     // Handle the error in the main function if needed
//   }
// };

// main();
