"use server";
require("dotenv").config(); // For Testing
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../../lib/bucket";

const getS3URL = async (fileName: string) => {
  try {
    const getObjectParams = {
      Bucket: process.env.BUCKET_NAME,
      Key: fileName,
    };
    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    return {
      success: true,
      data: url,
    } as const;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: "getting URL failed",
    } as const;
  }
};

export default getS3URL;

// const main = async () => {
//   const result = await getS3URL("jobFiles/filename");
//   console.log(result);
// };
// main();
