import type { JobStatus } from "@prisma/client";
import prisma from "../db/prisma";

interface FormData {
  jobId: string;
  title?: string;
  status?: JobStatus;
  description?: string;
  budget?: number;
  numWorker?: number;
  estimateStartDate?: Date;
  estimateEndDate?: Date;
  jobTagId?: string;
  files?: File | null;
  startDate?: Date;
  endDate?: Date;
}

const updateJob = async (formData: FormData) => {
  try {
    const jobId = formData.jobId;
    const title = formData.title;
    const status = formData.status; //ไม่น่าใช่ input จาก user เราคง้องกำหนดเอง
    const description = formData.description;
    const estimateStartDate = formData.estimateStartDate as Date;
    const estimateEndDate = formData.estimateEndDate as Date;
    const budget = formData.budget;
    const jobTagId = formData.jobTagId;
    const numWorker = formData.numWorker;
    const startDate = formData.startDate;
    const endDate = formData.endDate;
    const files = formData.files;
    console.log(
      title,
      status,
      description,
      estimateStartDate,
      estimateEndDate,
      budget,
      jobTagId,
      numWorker,
      startDate,
      endDate,
      files
    );

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
    const job = await prisma.job.findFirst({
      where: {
        id: jobId,
      },
      select: {
        applications: true,
      },
    });

    if (!job) {
      throw {
        message: "Job not found",
        status: 404,
      };
    } else if (job?.applications.length > 0) {
      throw {
        message: "Can't edit this job",
      };
    }

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        title,
        status,
        description,
        estimateStartDate,
        estimateEndDate,
        budget,
        jobTagId,
        numWorker,
        startDate,
        endDate,
      },
    });
    return {
      message: "Create Task Success",
      status: 201,
    };
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default updateJob;

const main = async () => {
  const data = {
    jobId: "bdf21ad2-c998-4e38-85af-e888df8c6759",
    title: "Test update work",
    startDate: new Date().toISOString(),
  } as unknown as FormData;
  const result = await updateJob(data);
  console.log(result);
};

main();
