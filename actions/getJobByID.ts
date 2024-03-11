"use server";

import prisma from "../db/prisma";
import { ApplicationStatus } from "@prisma/client";

const getJobById = async (jobId: string) => {
  console.log(jobId);
  const job: any = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
    include: {
      employer: true,
      jobTag: true,
      applications: true,
    },
  });
  // console.log(job);
  const userName: any = await prisma.user.findFirst({
    where: {
      id: job.employer.userId,
    },
    select: {
      firstname: true,
      middlename: true,
      lastname: true,
    },
  });

  const result: any = {
    id: job.id,
    title: job.title,
    startDate: job.estimateStartDate.toLocaleDateString("en-GB"),
    endDate: job.estimateEndDate.toLocaleDateString("en-GB"),
    jobTags: job.jobTag.title,
    description: job.description ? job.description : "",
    acceptNum: job.applications.filter(
      (app: any) => app.status == ApplicationStatus.ACCEPTED
    ).length, //TODO : Filter for accepted application
    maxAcceptNum: job.numWorker,
    budget: job.budget,
    userName: userName,
    position: job.employer.position,
    organization: job.employer.organization,
    status: job.status,
  };
  return result;
};

export default getJobById;

// const main = async () => {
//   const jobId = "bdf21ad2-c998-4e38-85af-e888df8c6759";
//   const result = await getJobById(jobId);
//   console.log(result);
// };

// main();
