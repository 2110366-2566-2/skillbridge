import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "@/lib/bucket";
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
  const URL = `${process.env.NEXT_AWS_S3_BUCKET_NAME}.${process.env.NEXT_AWS_S3_REGION}.amazonaws.com/${fileName}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_AWS_S3_BUCKET_NAME,
    Key: fileName,
    Body: buffer,
    ContentType: type,
    ContentLength: size,
  });

  try {
    const response = await s3.send(putObjectCommand);
    return URL;
  } catch (error) {
    throw { message: "Upload Failed" };
  }
};

export default uploadFileToS3;
