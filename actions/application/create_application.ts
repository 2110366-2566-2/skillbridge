"use server";
import { Session, getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "@/lib/bucket";

export const uploadFile = async (file: File, path: string) => {
  const validPath = ["jobFiles", "applicationFiles"];
  if (!validPath.includes(path)) {
    return {
      message: "Invalid upload arguments",
    };
  }
  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: "test-file",
    ContentType: "pdf",
  });
  const response = await s3.send(putObjectCommand);
};

const createApplication = async (formData: FormData) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      throw {
        message: "Not Authenticated",
        status: 401,
      };
    }
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};
export default createApplication;
