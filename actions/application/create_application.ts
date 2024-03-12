"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { prisma } from "@/lib/prisma";
import { float } from "@elastic/elasticsearch/lib/api/types";
import uploadFileToS3 from "../uploadFileToS3";

const acceptedType = "application/pdf";

const createApplication = async (formData: FormData) => {
  try {
    const session: any = await getServerSession(authOptions);
    if (!session) {
      throw {
        message: "Not Authenticated",
        status: 401,
      };
    }

    const file = formData.get("file") as File;
    const bid = formData.get("bid") as unknown as float;
    const jobID = formData.get("jobID") as string;

    if (file.size > 1024 * 1024 * 5) {
      throw {
        message: "Files are too large",
      };
    }

    if (file.type !== acceptedType) {
      throw {
        message: "Invalid File Type",
      };
    }
    const buffer = new Uint8Array(await file.arrayBuffer());
    const url: string | any = await uploadFileToS3(
      buffer,
      file.type,
      file.size,
      "/applicationFiles"
    );

    if (url.message) {
      throw url;
    }

    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId: jobID,
        bid: bid,
        // documentUrl: url,
      },
    });

    const successResponse = {
      message: "Create Application Success",
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
export default createApplication;

// const main = async () => {
//   uploadFileToS3("jobFiles");
// };

// main();
