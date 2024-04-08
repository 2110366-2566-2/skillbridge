"use server";

import { JobStatus, ApplicationStatus } from "@prisma/client";
import { prisma } from "../../lib/prisma";

export interface job {
  id: string;
  isDeleted: boolean;
  title: string;
  startDate: Date;
  endDate: Date;
  jobTags: string;
  description: string;
  acceptNum: number;
  maxAcceptNum: number;
  budget: number;
  jobStatus: JobStatus;
}

async function getJobsByEmployerId(employerId: string) {
  try {
    const output: job[] = [];

    const jobs = await prisma.job.findMany({
      include: {
        jobTag: true,
        applications: true,
      },
      where: {
        employerId: {
          equals: employerId,
        },
      },
    });

    jobs.forEach((job) => {
      const showJob: job = {
        id: job.id,
        isDeleted: job.isDeleted,
        title: job.title,
        startDate: job.estimateStartDate,
        endDate: job.estimateEndDate,
        jobTags: job.jobTag.title,
        description: job.description ? job.description : "",
        acceptNum: job.applications.filter((app: any) => {
          return (
            app.status == ApplicationStatus.DEPOSIT_PENDING ||
            app.status == ApplicationStatus.IN_PROGRESS ||
            app.status == ApplicationStatus.DELIVERED ||
            app.status == ApplicationStatus.WAGE_PAYMENT_PENDING ||
            app.status == ApplicationStatus.DONE
          );
        }).length, //TODO : Filter for accepted application
        maxAcceptNum: job.numWorker,
        budget: job.budget,
        jobStatus: job.status,
      };

      output.push(showJob);
    });

    return output;
  } catch (error) {
    console.error("Error in getJobsByEmployerId:", error);
    return [];
  }
}
export default getJobsByEmployerId;
