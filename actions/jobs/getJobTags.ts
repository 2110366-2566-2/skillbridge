"use server";

import { prisma } from "../../lib/prisma";

const getJobTags = async () => {
  const result = await prisma.jobTag.findMany();
  return result;
};

export default getJobTags;

// const main = async () => {
//   const result = await getJobTags();
//   console.log(result);
// };

// main();
