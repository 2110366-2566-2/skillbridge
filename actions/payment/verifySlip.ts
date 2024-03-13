"use server"

import getS3URL from "../../lib/S3/getS3URL";
import qrReader from "../../lib/qrReader";

async function verifySlip(fileName: string) {
    console.log(process.env.NEXT_PUBLIC_BUCKET_REGION)
    const url = await getS3URL(fileName);
    const response = await qrReader(url as string)
    console.log(response)
}

export default verifySlip;

const main = async () => {
    const fileName = '014071184526APP07376.jpg'
    await verifySlip(fileName)
};

main();