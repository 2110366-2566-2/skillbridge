"use server";

import { prisma } from "../lib/prisma";

const deleteJob = async (job_id: string) => {
  try {
    console.log(job_id);
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
    const job_info = await prisma.job.findFirst({
      where: {
        id: job_id,
      },
      select: {
        applications: true,
        isDeleted: true,
      },
    });
    // console.log(job_info);
    // console.log(!job_info);
    // console.log(job_info?.status != "NOT_STARTED");
    // console.log(job_info?.Applied);
    if (!job_info || job_info.isDeleted) {
      throw {
        message: "Job not found",
        status: 404,
      };
    } else if (job_info?.applications.length > 0) {
      throw {
        message: "Can't edit this job",
        status: 423,
      };
    }

    await prisma.job.update({
      where: {
        id: job_id,
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
