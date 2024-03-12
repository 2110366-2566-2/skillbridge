import uploadFileToS3 from "@/lib/S3/uploadFileToS3";

const acceptedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/pdf",
];

const uploadMultipleFilesToS3 = async (files: File[]) => {
  try {
    let buffers: Uint8Array[] = [];
    let size_list: number[] = [];
    let types: string[] = [];
    let sumSize = 0;
    for (const f of files) {
      if (!acceptedTypes.includes(f.type)) {
        throw {
          message: "Invalid files type",
        };
      }
      sumSize = sumSize + f.size;
      const arrayBuffer = await f?.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      buffers.push(buffer);
      size_list.push(f.size);
      types.push(f.type);
    }
    if (sumSize > 1024 * 1024 * 5) {
      throw {
        message: "Files is too large.",
      };
    }
    let results: string[] = [];
    for (let i = 0; i < buffers.length; i++) {
      const result: string | any = await uploadFileToS3(
        buffers[i],
        types[i],
        size_list[i],
        "jobFiles"
      );
      if (result.message) {
        throw result;
      }
      results.push(result);
    }
    return results;
  } catch (error: any) {
    console.log(error);
    return {
      message: error.message || "Internal Server Error",
      status: error.status || 500,
    };
  }
};

export default uploadMultipleFilesToS3;
