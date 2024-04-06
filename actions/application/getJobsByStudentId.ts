import { prisma } from "../../lib/prisma";

export interface JobTag {
  title: string;
}

export interface Job {
  title: string;
  estimateStartDate: Date;
  estimateEndDate: Date;
  jobTag: JobTag;
}

export interface JobsByStudent {
  userId: string;
  jobId: string;
  bid: number;
  status: string;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
  isAcknowledged: boolean;
  job: Job;
}

const getJobsByStudentId = async (studentId: string): Promise<JobsByStudent[]> => {
  try {
    const jobs = await prisma.application.findMany({
      where: {
        userId: studentId,
        status: {
          in: ["IN_PROGRESS", "DELIVERED", "WAGE_PAYMENT_PENDING", "DEPOSIT_PENDING", "DONE"],
        },
      },
      include: {
        job: {
          select: {
            title: true,
            estimateEndDate: true,
            estimateStartDate: true,
            jobTag: {
              select: {
                title: true,
              },
            },
          },
        },
      },
    });
    return jobs;
  } catch (err) {
    console.log("Error fetching jobs:", err);
    return [];
  }
};

export default getJobsByStudentId;
