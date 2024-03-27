import { toServerImageMessage } from '../types/chat';
import uploadFileToS3 from '../actions/public/S3/uploadFileToS3'


/*
const uploadFileToS3 = async (
  buffer: Uint8Array,
  type: string,
  size: number,
  path: string
)
*/

export async function uploadImageToS3(imageMessage: toServerImageMessage): Promise<string> { // return fileName in the system
    if (imageMessage.size > 1024 * 1024 * 5) {
        throw {
            success: false,
            message: "Files are too large",
        };
    }

    const buffer: Uint8Array = new Uint8Array(imageMessage.buffer);

    const result: {
        success: boolean;
        data?: string; // fileName
        message?: string;
    } = await uploadFileToS3(buffer, imageMessage.type, imageMessage.size, "imageMessageFiles");

    if (!result.success || !result.data) {
        throw {
            success: false,
            message: result.message ? result.message : "Upload image to S3 failed"
        }
    }

    return result.data;
}