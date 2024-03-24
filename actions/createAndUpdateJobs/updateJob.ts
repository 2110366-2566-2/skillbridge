"use server";
// require("dotenv").config(); // For Testing
import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";
import { string } from "zod";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/auth";
import JobSchema from "../../types/JobType";
import { ZodError, z } from "zod";
import { Response } from "../../types/ResponseType";
import createFileBuffer from "../public/S3/createFileBuffer";
import uploadFileToS3 from "../public/S3/uploadFileToS3";
import type { Session } from "next-auth";
import { JobStatus } from "@prisma/client";

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const UpdateJobSchema = JobSchema.partial().extend({
  jobId: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});
type JobUpdateForm = z.infer<typeof UpdateJobSchema>;
type ZodResponse =
  | { success: true; data: JobUpdateForm }
  | { success: false; error: ZodError };
const updateJob = async (formData: FormData) => {
  try {
    const response: ZodResponse = UpdateJobSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!response.success) {
      throw response.error;
    }
    const jobId: string = response.data.jobId;
    const title: string | undefined = response.data.title;
    const description: string | undefined = response.data.description;
    const estimateStartDate: Date | undefined = response.data.estimateStartDate;
    const estimateEndDate: Date | undefined = response.data.estimateEndDate;
    const budget: number | undefined = response.data.budget;
    const jobTagId: string | undefined = response.data.jobTagId;
    const numWorker: number | undefined = response.data.numWorker;
    const file: File | undefined = response.data["files[]"];
    const startDate: Date | undefined = response.data.startDate;
    const endDate: Date | undefined = response.data.endDate;
    const status = response.data.status;

    // console.log(
    //   jobId,
    //   title,
    //   description,
    //   parsedStartDate,
    //   parsedEndDate,
    //   budget,
    //   jobTagId,
    //   numWorker,
    //   files
    // );

    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user.id;
    const employer = await prisma.employer.findFirst({
      where: { userId: userId },
      select: { userId: true },
    });

    if (!session || !employer) {
      throw {
        message: "Authentication fail",
        status: 401,
      };
    }

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
      throw {
        message: "Can't edit this job",
        status: 423,
      };
    }
    let jobDocumentFile = null;
    if (file) {
      const bufferResponse: Response<Uint8Array> = await createFileBuffer(
        file,
        acceptedTypes
      );
      if (!bufferResponse.success) {
        throw bufferResponse.message;
      }
      const fileResponse: Response<string> = await uploadFileToS3(
        bufferResponse.data,
        file.type,
        file.size,
        "jobFiles"
      );
      if (!fileResponse.success) {
        throw fileResponse.message;
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
      await prisma.jobDocumentFile.create({
        data: {
          jobId: jobId,
          fileName: fileResponse.data,
        },
      });
    }

    await prisma.job.update({
      where: {
        id: jobId,
      },
      data: {
        title,
        description,
        estimateStartDate,
        estimateEndDate,
        budget,
        jobTagId,
        numWorker,
        startDate,
        endDate,
        status,
        updatedAt: new Date().toLocaleDateString("en-GB"),
      },
    });

    // Revalidate the data on jobs page
    revalidatePath("/jobs/[jobId]/update");

    const successResponse = {
      message: "Update Task Success",
      status: 201,
    };

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
//   const file: File = new File(["1234"], "filename", {
//     type: "application/pdf",
//   });
//   const data = {
//     jobId: "5525a176-ea04-4395-8906-38155d99e401",
//     title: "Test update work",
//     file: file,
//   };
//   let formData = new FormData();
//   for (let key in data) {
//     formData.append(key, data[key as keyof typeof data]);
//   }
//   const result = await updateJob(formData);
//   console.log(result);
// };

// main();
