"use server";
// require("dotenv").config(); // For Testing
import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3 from "../../../lib/bucket";
import crypto from "crypto";

interface Error {
  message: string;
}

const uploadFileToS3 = async (
  buffer: Uint8Array,
  type: string,
  size: number,
  path: string,
  fileName: string
) => {
  try {
    const validPath = ["jobFiles", "applicationFiles", "transactionFiles", "messageImageFiles"];

    if (!validPath.includes(path)) {
      throw {
        message: "Invalid upload arguments",
      };
    }
    const name = `${path}/${fileName}`;

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.BUCKET_NAME,
      Key: name,
      Body: buffer,
      ContentType: type,
      ContentLength: size,
    });
    const response = await s3.send(putObjectCommand);
    // console.log(response);
    return {
      success: true,
      data: name,
    } as const;
  } catch (error: any) {
    console.log(error);
    const message: string = error.message ? error.message : "Upload Failed";
    return {
      success: false,
      message,
    } as const;
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
