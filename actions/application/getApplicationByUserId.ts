import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import getS3URL from "../public/S3/getS3URL";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getApplicationByUserId = async (jobId: string, userId?: string) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      throw { message: "Not authenticated", status: 401 };
    }
    const id = userId ? userId : session.user.id;
    let application: any = await prisma.application.findFirst({
      where: {
        jobId: jobId,
        userId: id,
      },
      include: {
        applicationDocumentFiles: true,
        job: true,
      },
    });
    let jobBudget = application?.job.budget;
    let jobStatus = application?.job.status;
    if (!application) {
      const query: any = await prisma.job.findFirst({
        where: {
          id: jobId,
        },
        select: {
          budget: true,
          status: true,
        },
      });
      jobBudget = query.budget;
      jobStatus = query.status;
    }

    let signUrl: string | any = null
    if (application?.applicationDocumentFiles[0]) {
      signUrl = await getS3URL(
        application.applicationDocumentFiles[0].fileName
      );
    }

    // if (signUrl.message) {
    //   signUrl = null;
    // }
    let output = {
      bid: application?.bid ? (application.bid as number) : null,
      applicationStatus: application?.status
        ? (application.status as string)
        : null,
      url: signUrl ? (signUrl as string) : null,
      budget: jobBudget as number,
      jobStatus: jobStatus ? (jobStatus as string) : null,
    };
    return output;
  } catch (error: any) {
    console.log(error);
    return null;
    // return {
    //   message: error.message || "Internal Server Error",
    //   status: error.status || 500,
    // };
  }
};

export default getApplicationByUserId;