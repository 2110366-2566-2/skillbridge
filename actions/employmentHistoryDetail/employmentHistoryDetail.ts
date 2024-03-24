import { getServerSession } from "next-auth";
import { AuthOptions } from "next-auth";
import { prisma } from "@/lib/prisma";

const getRating = async (jobId: string, studentId: string) => {
  try {
    const review = await prisma.review.findFirstOrThrow({
      where: {
        jobId: jobId,
        studentId: studentId,
        isDeleted: false,
      },
      select: {
        stars: true,
      },
    });
    return {
      success: true,
      data: review.stars,
    } as const;
  } catch (error: any) {
    return {
      success: false,
      message: error,
    } as const;
  }
};

const getComment = async (jobId: string, studentId: string) => {
  try {
    const comment = await prisma.review.findFirstOrThrow({
      where: {
        jobId: jobId,
        studentId: studentId,
        isDeleted: false,
      },
      select: {
        description: true,
      },
    });
    return {
      success: true,
      data: comment.description,
    } as const;
  } catch (error: any) {
    return {
      success: false,
      message: error,
    } as const;
  }
};

const getJobId = async (jobId: string, studentId: string) => {
  try {
    const job = await prisma.review.findFirstOrThrow({
      where: {
        jobId: jobId,
        studentId: studentId,
        isDeleted: false,
      },
      select: {
        jobId: true,
      },
    });
    return {
      success: true,
      message: job.jobId,
    } as const;
  } catch (error: any) {
    return {
      success: false,
      message: error,
    };
  }
};

const getEmploymentTracking = async (jobId: string, studentId: string) => {};

export { getRating, getComment, getJobId };
