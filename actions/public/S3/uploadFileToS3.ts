"use server";
// require("dotenv").config(); // For Testing
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../../lib/bucket";
import crypto from "crypto";
const generateFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

interface Error {
  message: string;
}

const uploadFileToS3 = async (
  buffer: Uint8Array,
  type: string,
  size: number,
  path: string
) => {
  const validPath = ["jobFiles", "applicationFiles", "transactionFiles"];

  if (!validPath.includes(path)) {
    return {
      message: "Invalid upload arguments",
    };
  }
  const fileName = generateFileName();
  const URL = `${path}/${fileName}`;

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: URL,
    Body: buffer,
    ContentType: type,
    ContentLength: size,
  });

  try {
    const response = await s3.send(putObjectCommand);
    // console.log(response);
    return URL;
  } catch (error) {
    console.log(error);
    throw { message: "Upload Failed" } as Error;
  }
};

export default uploadFileToS3;

//TEST
// import getS3Url from "./getS3URL";
// import { loadEnvConfig } from "@next/env";
// import { z } from "zod";
// const main = async () => {
//   loadEnvConfig("../../../.env.local");
//   const file: File = new File(["1234"], "filename", {
//     type: "application/pdf",
//   });
//   const type: string = file.type;
//   const size: number = file.size;
//   const path = "jobFiles";
//   const buffer: Uint8Array = new Uint8Array(await file.arrayBuffer());
//   const result: string | Error = await uploadFileToS3(buffer, type, size, path);
//   console.log(result);
//   if (z.string().safeParse(result)) {
//     const url = await getS3Url(result as string);
//     console.log(url);
//   }
// };

// main();
