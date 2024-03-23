import { boolean } from "zod";

const createFileBuffer = async (file: File, acceptedType: Array<string>) => {
  try {
    if (file.size > 1024 * 1024 * 5) {
      throw {
        success: false,
        message: "Files are too large",
      };
    }
    // console.log((file?.type) , (file?.type !== acceptedType))
    if (!acceptedType.includes(file.type)) {
      throw {
        success: false,
        message: "Invalid File Type",
      };
    }
    const buffer: Uint8Array = new Uint8Array(await file.arrayBuffer());
    return {
      success: true,
      data: buffer,
    } as const;
  } catch (error: any) {
    const message: string = error.message;
    return {
      success: false,
      message,
    } as const;
  }
};

export default createFileBuffer;
