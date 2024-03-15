"use server";
import { prisma } from "../../lib/prisma";
import { JobStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import uploadMultipleFilesToS3 from "../public/S3/uploadMultipleFilesToS3";

const createJob = async (formData: FormData) => {
  try {
    // const employerId = formData.get("employerId") as string;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const estimateStartDate = formData.get("estimateStartDate") as string;
    const parsedStartDate = new Date(estimateStartDate);
    const estimateEndDate = formData.get("estimateEndDate") as string;
    const parsedEndDate = new Date(estimateEndDate);
    const budget = parseInt(formData.get("budget") as string, 10);
    const jobTagId = formData.get("jobTagId") as string;
    const numWorker = parseInt(formData.get("numWorker") as string, 10);
    const files = formData.getAll("files[]") as File[];
    const status = "NOT_STARTED" as JobStatus;

    // Test log
    console.log(
      title,
      status,
      description,
      parsedStartDate,
      parsedEndDate,
      budget,
      jobTagId,
      numWorker,
      files,
    );

    const session: any = await getServerSession(authOptions);
    const userId = session?.user.id;
    const employer = await prisma.employer.findFirst({
      where: { userId: userId },
      select: { userId: true },
    });

    if (!session || !employer) {
      throw {
        message: "Not Authenticated",
        status: 401,
      };
    }

    const results: string[] | any = await uploadMultipleFilesToS3(files);
    if (results.message) {
      throw results;
    }
    let job = await prisma.job.create({
      data: {
        employerId: session.user.id,
        title: title,
        status: status,
        description: description,
        estimateStartDate: parsedStartDate,
        estimateEndDate: parsedEndDate,
        budget: budget,
        numWorker: numWorker,
        jobTagId: jobTagId,
      },
    });
    for (let i = 0; i < results.length; i++) {
      await prisma.jobDocumentFile.create({
        data: {
          jobId: job.id,
          fileName: results[i],
        },
      });
    }

    const successResponse = {
      message: "Create Task Success",
      status: 201,
    };
    console.log(successResponse);
    return successResponse;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default createJob;

// const main = async () => {
//   const data = {
//     employerId: "d8e9d51d-fdfc-40db-8609-cd538d9b29d3",
//     title: "Test work",
//     description: "test description",
//     estimateStartDate: new Date().toISOString(),
//     estimateEndDate: new Date().toISOString(),
//     budget: 1000,
//     numWorker: 1,
//     jobTagId: "bbd48fc1-f109-4321-a854-33604647ad2f",
//     files: null,
//   } as unknown as FormData;
//   const result = await createJob(data);
// };

// main();
