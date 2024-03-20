import { prisma } from "@/lib/prisma";
import getS3URL from "../public/S3/getS3URL";

const getApplications = async (jobID: string) => {
  try {
    const applications = await prisma.application.findMany({
      where: {
        jobId: jobID,
      },
      include: {
        user: true,
      },
    });

    if (!applications) {
      throw { message: "Application not found" };
    }
    let output: any[] = [];
    applications.forEach((app) => {
      const out = {
        userId: app.userId,
        jobId: app.jobId,
        bid: app.bid,
        status: app.status,
        createdAt: app.createdAt,
        isAcknowledged: app.isAcknowledged,
        user: {
          firstName: app.user.firstname,
          middleName: app.user.middlename,
          lastName: app.user.lastname,
        },
      };
      output.push(out);
    });

    return output;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default getApplications;
