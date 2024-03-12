import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import getS3URL from "@/lib/S3/getS3URL";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

const getApplicationByUserId = async (jobId: string, userId?: string) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      throw { message: "Not authenticated", status: 401 };
    }
    const id = userId ? userId : session.user.userId;
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

    // if (!application) {
    //   throw {
    //     message: "Application not found",
    //   };
    // }
    let signUrl: string | any = null
    if (application?.applicationDocumentFile) {
      signUrl = await getS3URL(
        application.applicationDocumentFile.fileName
      );
    }

    // if (signUrl.message) {
    //   throw signUrl;
    // }

    let output = {
      bid: application?.bid ? application.bid : null,
      applicationStatus: application?.status ? application.status : null,
      url: signUrl ? signUrl : null,
      budget: application?.job.budget ? application.job.budget : null,
    };
    return output;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default getApplicationByUserId;
