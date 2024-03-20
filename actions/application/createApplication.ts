"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../app/api/auth/[...nextauth]/auth";
import { prisma } from "../../lib/prisma";
import uploadFileToS3 from "../public/S3/uploadFileToS3";
import { ZodError, z } from "zod";
import type { Session } from "next-auth";

const acceptedType = "application/pdf";

const ApplicationShema = z.object({
  file: z.instanceof(File).nullish(),
  bid: z.coerce.number().gte(0),
  jobId: z.string(),
});

type ApplicationForm = z.infer<typeof ApplicationShema>;

type ZodResponse =
  | { success: true; data: ApplicationForm }
  | { success: false; error: ZodError };

const createApplication = async (formData: FormData) => {
  try {
    const response: ZodResponse = ApplicationShema.safeParse(
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
        jobId: jobId,
        bid: bid,
      },
    });

    if (file?.type) {
      const buffer = new Uint8Array(await file.arrayBuffer());
      const fileName: string | any = await uploadFileToS3(
        buffer,
        file.type,
        file.size,
        "applicationFiles"
      );

      if (fileName?.message) {
        throw fileName;
      }
      appDocs = await prisma.applicationDocumentFile.create({
        data: {
          applicationUserId: session.user.id,
          applicationJobId: jobId,
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
//   const result = await createApplication(formData);
//   console.log(result);
// };

// main();
