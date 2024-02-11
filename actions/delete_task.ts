"use server";

import prisma from "@/db/prisma";

const deleteJob = async (formData: FormData) => {
  try {
    const job_id = formData.get("id") as string;
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
        Applied: true,
        status: true,
      },
    });
    // console.log(job_info);
    // console.log(!job_info);
    // console.log(job_info?.status != "NOT_STARTED");
    // console.log(job_info?.Applied);
    if (
      !job_info ||
      job_info?.status != "NOT_STARTED" ||
      job_info?.Applied.length > 0
    ) {
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

export default deleteJob;
