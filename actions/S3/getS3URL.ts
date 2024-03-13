"use server"

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../S3/bucket";
import { prisma } from "../prisma";

const getS3URL = async (fileName: string) => {
  try {
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    };
    console.log(1)
    const command = new GetObjectCommand(getObjectParams);
    console.log(2)
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log(3)
    return url;
  } catch (error) {
    console.log(error);
    return { message: "getting URL failed" };
  }
};

export default getS3URL;

const main = async () => {
  const fileName = '014071184526APP07376.jpg'
  const result = await getS3URL(fileName)
  console.log(result)
};

main();
