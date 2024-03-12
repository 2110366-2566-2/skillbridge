"use server";

import { prisma } from "../lib/prisma";
import { revalidatePath } from "next/cache";
import uploadMultipleFilesToS3 from "../lib/S3/uploadMultipleFilesToS3";
import { string } from "zod";

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const updateJob = async (formData: FormData) => {
  try {
    const jobId = formData.get("jobId") as string;
    const employerId = formData.get("employerId") as string;
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

    console.log(
      jobId,
      employerId,
      title,
      description,
      parsedStartDate,
      parsedEndDate,
      budget,
      jobTagId,
      numWorker,
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

    const job: any = await prisma.job.findFirst({
      where: {
        id: jobId,
      },
      select: {
        applications: true,
        isDeleted: true,
        jobDocumentFiles: true,
      },
    });

    if (!job || job.isDeleted) {
      throw {
        message: "Job not found",
        status: 404,
      };
    } else if (job?.applications.length > 0) {
      console.log(job);
      throw {
        message: "Can't edit this job",
        status: 423,
      };
    }
    let jobDocumentFile = null;
    if (files) {
      const results: string | any = await uploadMultipleFilesToS3(files);
      if (results.message) {
        throw results;
      }
      if (job.jobDocumentFiles) {
        job.jobDocumentFiles.forEach(async (doc: any) => {
          await prisma.jobDocumentFile.update({
            where: {
              id: doc.id,
            },
            data: {
              isDeleted: true,
            },
          });
        });
      }

      results.forEach(async (fileName: string) => {
        await prisma.jobDocumentFile.create({
          data: {
            jobId: jobId,
            fileName: fileName,
          },
        });
      });
    }

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        title,
        description,
        estimateStartDate: parsedStartDate,
        estimateEndDate: parsedEndDate,
        budget,
        jobTagId,
        numWorker,
      },
    });

    // Revalidate the data on jobs page
    revalidatePath("/jobs/update/[jobId]");

    const successResponse = {
      message: "Update Task Success",
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

export default updateJob;

// const main = async () => {
//   const data = {
//     jobId: "bdf21ad2-c998-4e38-85af-e888df8c6759",
//     title: "Test update work",
//     startDate: new Date().toISOString(),
//   } as unknown as FormData;
//   const result = await updateJob(data);
//   console.log(result);
// };

// main();
