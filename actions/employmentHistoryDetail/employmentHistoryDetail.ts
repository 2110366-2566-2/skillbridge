"use server";
// require("dotenv").config(); // For Testing
import { prisma } from "../../lib/prisma";
import { EmploymentTrack } from "../../types/employmentTrackType";

const getRating = async (jobId: string, studentId: string) => {
  try {
    const review = await prisma.review.findFirstOrThrow({
      where: {
        jobId: jobId,
        studentId: studentId,
        isDeleted: { equals: false },
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
        isDeleted: { equals: false },
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


const getEmploymentTracking = async (jobId: string, studentId: string) => {
  try {
    const application = await prisma.application.findFirstOrThrow({
      where: {
        jobId: jobId,
        userId: studentId,
      },
      select: {
        applicationStatusLogs: true,
      },
    });
    let data: Array<EmploymentTrack> = [];
    let before: string | undefined = undefined;
    for (const applicationStatus of application.applicationStatusLogs) {
      const track: EmploymentTrack = {
        status: {
          before: before,
          after: applicationStatus.status,
        },
        date: applicationStatus.updatedAt,
      };
      before = applicationStatus.status;
      data.push(track);
    }
    return {
      success: true,
      data: data,
    } as const;
  } catch (error: any) {
    return {
      success: false,
      message: error,
    } as const;
  }
};

export { getRating, getComment, getJobId };

// const main = async () => {
//   const studentId = "1dabcb91-32fd-41ea-a8f1-684e2c830090";
//   const jobId = "0f1c9477-982f-4075-8d1a-2117956b8a51";
//   const rating_result = await getRating(jobId, studentId);
//   console.log(rating_result);
//   const comment_result = await getComment(jobId, studentId);
//   console.log(comment_result);
//   const job_id_result = await getJobId(jobId, studentId);
//   console.log(job_id_result);
// };

// main();
