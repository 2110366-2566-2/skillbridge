"use server";
import prisma from "../db/prisma";
import cloudinary from "../lib/bucket";
import { JobStatus } from "@prisma/client";
//import {getServerSession} from "next-auth";
//import {options} from "../api/auth/[...nextaut]/options"

const createJob = async (formData: FormData) => {
  try {
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
    const status = "NOT_STARTED" as JobStatus;

    // Test log
    console.log(
      employerId,
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
    let buffers: Uint8Array[] = [];
    let sumSize = 0;
    for (const f of files) {
      sumSize = sumSize + f.size;
      const arrayBuffer = await f?.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      buffers.push(buffer);
    }
    if (sumSize > 1024 * 1024 * 5) {
      throw {
        message: "Invalid file format or file is too large.",
      };
    }
    let results: any[] = [];
    for (let i = 0; i < buffers.length; i++) {
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "test", timeout: 120000 },
            function (error, result) {
              if (error) {
                reject(error);
                return;
              }
              resolve(result);
            },
          )
          .end(buffers[i]);
      });
      results.push(result);
    }

    let job = await prisma.job.create({
      data: {
        employerId: employerId,
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
          fileUrl: results[i].secure_url,
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
