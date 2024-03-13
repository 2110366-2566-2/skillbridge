"use server"

import { S3Client } from "@aws-sdk/client-s3";

const s3 = new S3Client({
  region: "us-east-1",
  credentials: {
    accessKeyId: "AKIAVRUVUMB3ZFAZRNTX",
    secretAccessKey: "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",
  },
});

// s3.config.region = provess.env.

export default s3;
