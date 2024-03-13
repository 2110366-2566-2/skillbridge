"use server"

import getS3URL from "../S3/getS3URL";
import qrReader from "../../lib/qrReader";

async function verifySlip(fileName: string) {
    const url = await getS3URL(fileName);
    const data = await qrReader(url as string)
    console.log("data", data)
}

export default verifySlip;

// const main = async () => {
//     const fileName = '014071184526APP07376.jpg'
//     await verifySlip(fileName)
// };

// main();