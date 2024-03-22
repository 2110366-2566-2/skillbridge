"use server";

import { prisma } from "../../lib/prisma";
import { ApplicationStatus } from "@prisma/client";
import getS3URL from "../public/S3/getS3URL";

const getJobById = async (jobId: string) => {
  const job: any = await prisma.job.findFirst({
    where: {
      id: jobId,
    },
    include: {
      employer: true,
      jobTag: true,
      applications: true,
      jobDocumentFiles: {
        select: {
          fileName: true
        }
      },
    },
  });

  // Iterate through each jobDocumentFile and replace fileName with fileLink
  for (const file of job.jobDocumentFiles) {
    file.fileLink = await getS3URL(file.fileName);
    // Remove the original fileName
    delete file.fileName;
  }

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
    estimateStartDate: job.estimateStartDate.toLocaleDateString("en-GB"),
    estimateEndDate: job.estimateEndDate.toLocaleDateString("en-GB"),
    jobTags: job.jobTag.title,
    description: job.description ? job.description : "",
    acceptNum: job.applications.filter(
      (app: any) => app.status == ApplicationStatus.ACCEPTED,
    ).length, //TODO : Filter for accepted application
    maxAcceptNum: job.numWorker,
    budget: job.budget,
    userName: userName,
    position: job.employer.position,
    organization: job.employer.organization,
    status: job.status,
    numWorker: job.numWorker,
    jobTagId: job.jobTag.id,
    jobDocumentFiles: job.jobDocumentFiles,
  };
  return result;
};

export default getJobById;

// const main = async () => {
//   const jobId = "b9675f1e-f974-4413-a8d0-56e89e09e6e3";
//   const result = await getJobById(jobId);
//   console.log(result);
// };

// main();
