"use server";

import { prisma } from "../../lib/prisma";

const deleteJob = async (jobId: string) => {
  try {
    console.log(jobId);
    //const session = await getServerSession(options);
    //const userId = session?.userId
    // const employer = await prisma.employer.findFirst({
    //   where:{ userId: userId},
    //   select:{userId:true}
    // })

    // if (!session || !employer){
    //   throw {
    //     message: "Authentication fail",
    //     status: 401
    //   }
    // }
    const jobInfo = await prisma.job.findFirst({
      where: {
        id: jobId,
      },
      select: {
        applications: true,
        isDeleted: true,
        jobDocumentFiles: true,
      },
    });
    // console.log(jobInfo);
    // console.log(!jobInfo);
    // console.log(jobInfo?.status != "NOT_STARTED");
    // console.log(jobInfo?.Applied);
    if (!jobInfo || jobInfo.isDeleted) {
      throw {
        message: "Job not found",
        status: 404,
      };
    } else if (jobInfo?.applications.length > 0) {
      throw {
        message: "Can't delete this job",
        status: 423,
      };
    }

    for (const doc of jobInfo.jobDocumentFiles) {
      await prisma.jobDocumentFile.update({
        where: {
          id: doc.id,
        },
        data: {
          isDeleted: true,
        },
      });
    }
    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        isDeleted: true,
      },
    });

    return {
      message: "delete the job success",
      status: 200,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default deleteJob;

// const main = async () => {
//   const result = await deleteJob("5525a176-ea04-4395-8906-38155d99e401");
//   console.log(result);
// };

// main();
