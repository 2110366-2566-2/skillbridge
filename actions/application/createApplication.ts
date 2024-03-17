"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/auth";
import { prisma } from "../../lib/prisma";
import uploadFileToS3 from "../public/S3/uploadFileToS3";
import { boolean } from "zod";
import { File } from "@web-std/file";

const acceptedType = "application/pdf";

const createApplication = async (formData: FormData) => {
  try {
    // let session = undefined;
    const session: any = await getServerSession(authOptions);
    const userId = session?.user.id;
    // console.log(userId)
    const student = await prisma.student.findFirst({
      where: { userId: userId },
      select: { userId: true },
    });

    if (!session || !student) {
      throw {
        message: "Not Authenticated",
        status: 401,
      };
    }

    let file = formData.get("file") as File | null;
    // console.log('print file', file)
    const bid = formData.get("bid") as string;
    const jobID = formData.get("jobId") as string;

    if (file && file?.size > 1024 * 1024 * 5) {
      throw {
        message: "Files are too large",
      };
    }
    // console.log((file?.type) , (file?.type !== acceptedType))
    if (file?.type && file?.type !== acceptedType) {
      throw {
        message: "Invalid File Type",
      };
    }
    let appDocs: any | undefined;
    // console.log('show file', file)
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId: jobID,
        bid: parseFloat(bid),
      },
    });

    if (file?.type) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const fileName: string | any = await uploadFileToS3(
        buffer,
        file.type,
        file.size,
        "applicationFiles",
      );

      if (fileName?.message) {
        throw fileName;
      }
      appDocs = await prisma.applicationDocumentFile.create({
        data: {
          applicationUserId: session.user.id,
          applicationJobId: jobID,
          fileName: fileName,
        },
      });
    }

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
//   const file = new File(["1234"], "filename", { type: "application/pdf" });
//   const data = {
//     jobId: "3ff661c1-0036-4123-b48c-09f218874e81",
//     bid: "100",
//   };
//   let formData = new FormData();
//   for (let key in data) {
//     formData.append(key, data[key as keyof typeof data]);
//   }
//   const result = await createApplication(
//     formData,
//     "9160ebd3-8df5-46a3-ba9b-9152b0ff5c0c"
//   );
//   console.log(result);
// };

// main();
