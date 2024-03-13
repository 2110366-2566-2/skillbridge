"use server";
import { JobStatus, ApplicationStatus } from "@prisma/client";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";

export interface job {
  id: string;
  isDeleted: boolean;
  title: string;
  startDate: string;
  endDate: string;
  jobTags: string;
  description: string;
  acceptNum: number;
  maxAcceptNum: number;
  budget: number;
  jobStatus: JobStatus;
}

async function getEmployerJobs() {
  const session = await getServerSession(authOptions);
  if (session?.user?.id) {
    const employer = await prisma.employer.findFirst({
      where: { userId: session.user.id },
      select: { userId: true },
    });

    if (!session || !employer) {
      throw {
        message: "Authentication fail",
        status: 401,
      };
    }

    const output: job[] = [];

    const jobs = await prisma.job.findMany({
      include: {
        jobTag: true,
        applications: true,
      },
      where: {
        employerId: {
          equals: employer.userId,
        },
      },
    });

    jobs.forEach((job) => {
      const showJob: job = {
        id: job.id,
        isDeleted: job.isDeleted,
        title: job.title,
        startDate: job.estimateStartDate.toLocaleDateString("en-GB"),
        endDate: job.estimateEndDate.toLocaleDateString("en-GB"),
        jobTags: job.jobTag.title,
        description: job.description ? job.description : "",
        acceptNum: job.applications.filter(
          (app) => app.status == ApplicationStatus.ACCEPTED
        ).length,
        maxAcceptNum: job.numWorker,
        budget: job.budget,
        jobStatus: job.status,
      };

      output.push(showJob);
    });

    return output;
  }
}
export { getEmployerJobs };
