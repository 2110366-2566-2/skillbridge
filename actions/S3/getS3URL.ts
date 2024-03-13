"use server";

import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../lib/bucket";

const getS3URL = async (fileName: string) => {
  try {
    console.log("BUCKET_NAME", process.env.BUCKET_NAME);
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

// const main = async () => {
//   const fileName = "03519fc459139620652729caf68ba68d8bb17c5208ba055ae59b5516905c5a79"
//   const result = await getS3URL(fileName)
//   console.log(result)
// };

// main();
