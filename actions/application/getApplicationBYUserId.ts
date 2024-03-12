import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import getS3URL from "@/lib/getS3URL";
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
      },
    });

    if (!application) {
      throw {
        message: "Application not found",
      };
    }

    const signUrl: string | any = await getS3URL(
      application.applicationDocumentFile.fileName
    );

    if (signUrl.message) {
      throw signUrl;
    }

    application.url = signUrl;
    return application;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};
