"use server";

import prisma from "@/db/prisma";
import { Prisma } from "@prisma/client";

const deleteJob = async (formData: FormData) => {
  try {
    const job_id = formData.get("id") as string;

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
        Applied: true,
        status: true,
      },
    });

    if (job_info?.status != "NOT_STARTED" || job_info?.Applied) {
      throw {
        message: "Can't delete this job",
      };
    }

    await prisma.job.delete({
      where: {
        id: job_id,
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
