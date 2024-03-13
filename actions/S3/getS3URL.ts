"use server"

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "./bucket";
import { prisma } from "@/lib/prisma";

const getS3URL = async (fileName: string) => {
  try {
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return url;
  } catch (error) {
    console.log(error);
    return { message: "getting URL failed" };
  }
};

export default getS3URL;
