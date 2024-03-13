"use server"

import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "./bucket";
import crypto from "crypto";
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

const uploadFileToS3 = async (
  buffer: Uint8Array,
  type: string,
  size: number,
  path: string
) => {
  const validPath = ["jobFiles", "applicationFiles"];

  if (!validPath.includes(path)) {
    return {
      message: "Invalid upload arguments",
    };
  }
  const fileName = generateFileName();
  // const URL = `${process.env.BUCKET_NAME}.s3.${process.env.BUCKET_REGION}.amazonaws.com/${fileName}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: type,
    ContentLength: size,
  });

  try {
    const response = await s3.send(putObjectCommand);
    return fileName;
  } catch (error) {
    console.log(error);
    throw { message: "Upload Failed" };
  }
};

export default uploadFileToS3;
