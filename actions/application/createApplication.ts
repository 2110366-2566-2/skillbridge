"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/auth";
import { prisma } from "../../lib/prisma";
import uploadFileToS3 from "../public/S3/uploadFileToS3";
import { ZodError, z } from "zod";
import type { Session } from "next-auth";
import createFileBuffer from "../public/S3/createFileBuffer";
import { Response } from "@/types/ResponseType";

const acceptedType = ["application/pdf"];

const ApplicationSchema = z.object({
  file: z.instanceof(File).nullish(),
  bid: z.coerce.number().gte(0),
  jobId: z.string(),
});

type ApplicationForm = z.infer<typeof ApplicationSchema>;

type ZodResponse =
  | { success: true; data: ApplicationForm }
  | { success: false; error: ZodError };

const createApplication = async (formData: FormData) => {
  try {
    const response: ZodResponse = ApplicationSchema.safeParse(
      Object.fromEntries(formData)
    );
    if (!response.success) {
      throw response.error;
    }

    const session: Session | null = await getServerSession(authOptions);
    const userId = session?.user.id;

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

    let file = response.data.file;
    // console.log('print file', file)
    const bid: number = response.data.bid;
    const jobId: string = response.data.jobId;
    let appDocs: any | undefined;
    // console.log('show file', file)
    const application = await prisma.application.create({
      data: {
        userId: session.user.id,
        jobId: jobId,
        bid: bid,
      },
    });

    if (file?.type) {
      const response: Response<Uint8Array> = await createFileBuffer(
        file,
        acceptedType
      );
      if (!response.success) {
        throw response.message;
      }
      const fileResponse: Response<string> = await uploadFileToS3(
        response.data,
        file.type,
        file.size,
        "applicationFiles",
        file.name
      );

      if (!fileResponse.success) {
        throw fileResponse.message;
      }
      appDocs = await prisma.applicationDocumentFile.create({
        data: {
          applicationUserId: session.user.id,
          applicationJobId: jobId,
          fileName: fileResponse.data,
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
//   const result = await createApplication(formData);
//   console.log(result);
// };

// main();
