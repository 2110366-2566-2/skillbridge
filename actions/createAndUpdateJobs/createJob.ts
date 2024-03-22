"use server";
import { prisma } from "../../lib/prisma";
import { JobStatus } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { ZodError, z } from "zod";
import JobSchema from "../../types/JobType";
import type { Session } from "next-auth";
import createFileBuffer from "../public/S3/createFileBuffer";
import { Response } from "@/types/ResponseType";
import uploadFileToS3 from "../public/S3/uploadFileToS3";

type JobForm = z.infer<typeof JobSchema>;
type ZodResponse =
  | { success: true; data: JobForm }
  | { success: false; error: ZodError };

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];
const createJob = async (formData: FormData) => {
  try {
    console.log(Object.fromEntries(formData));
    const response: ZodResponse = JobSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!response.success) {
      throw response.error;
    }

    const title: string = response.data.title;
    const description: string = response.data.description;
    const estimateStartDate: Date = response.data.estimateStartDate;
    const estimateEndDate: Date = response.data.estimateEndDate;
    const budget: number = response.data.budget;
    const jobTagId: string = response.data.jobTagId;
    const numWorker: number = response.data.numWorker;
    const file: File | undefined = response.data["files[]"];
    const status: JobStatus = response.data.status;

    // Test log
    // console.log(
    //   title,
    //   status,
    //   description,
    //   parsedStartDate,
    //   parsedEndDate,
    //   budget,
    //   jobTagId,
    //   numWorker,
    //   files
    // );
    console.log(file?.name);
    const session: Session | null = await getServerSession(authOptions);
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
    let job = await prisma.job.create({
      data: {
        employerId: session.user.id,
        title: title,
        status: status,
        description: description,
        estimateStartDate: estimateStartDate,
        estimateEndDate: estimateEndDate,
        budget: budget,
        numWorker: numWorker,
        jobTagId: jobTagId,
      },
    });

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
        "jobFiles",
        file.name
      );

      if (!fileResponse.success) {
        throw fileResponse.message;
      }

      await prisma.jobDocumentFile.create({
        data: {
          jobId: job.id,
          fileName: fileResponse.data,
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
