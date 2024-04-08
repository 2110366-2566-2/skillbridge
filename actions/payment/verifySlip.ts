"use server"

import getS3URL from "../public/S3/getS3URL"
import qrReader from "../../lib/qrReader"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"
import { prisma } from "../../lib/prisma"

async function verifySlip(transactionId: string, fileName: string, amount: number) {
  try {
    /* Check for authorization as this service only available for employer */
    const session: any = await getServerSession(authOptions)
    const userId = session?.user.id
    const employer = await prisma.employer.findFirst({
      where: { userId: userId },
      select: { userId: true },
    })

    if (!session || !employer) {
      return {
        success: false,
        message: "Not Authenticated",
        status: 401,
      }
    }

    /* Get signed url and extract the data from qrcode */
    const url = await getS3URL(fileName)
    if (!url.success) {
      throw url.message
    }
    const QRdata = await qrReader(url.data as string)

    /* qrcode not found */
    if (QRdata.status === 404) {
      return {
        success: false,
        message: "QR code not found",
        status: 404,
      }
    }

    /* qrcode found */
    if (QRdata.status === 200) {
      const res = await fetch(
        `https://api.slipok.com/api/line/apikey/${process.env.SLIPOK_BRANCH_ID}`,
        {
          method: "POST",
          headers: {
            "x-authorization": process.env.SLIPOK_API_KEY as string,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: QRdata.message,
          }),
        }
      )

      const response = await res.json()
      const { data } = response

      console.log(
        `Verified '${data.sender.displayName}' --${data.amount} THB--> '${data.receiver.displayName}'`
      )

      if (response.success && data.success) {
        if (
          data.receiver.name === process.env.RECIPIENT_EN_NAME &&
          data.receiver.displayName === process.env.RECIPIENT_TH_NAME &&
          data.amount === amount
        ) {
          /* Create new transactionDetail object */
          const transactionDetail = await prisma.transactionDetail.create({
            data: {
              transactionId: transactionId,
              transRef: data.transRef,
              sendingBank: data.sendingBank,
              transTimestamp: new Date(data.transTimestamp),
              senderTHName: data.sender.displayName,
              senderENName: data.sender.name,
              senderAccountType: data.sender.account.type,
              senderAccountValue: data.sender.account.value,
              receiverTHName: data.receiver.displayName,
              receiverENName: data.receiver.name,
              amount: data.amount,
              qrcodeData: data.qrcodeData,
            },
          })
          return {
            success: true,
            message: "The payment slip is successfully verified",
            status: 201,
          }
        } else {
          return {
            success: false,
            message: "The payment slip is not valid",
            status: 400,
          }
        }
      } else {
        return {
          success: false,
          message: "Cannot read the provided payment slip",
          status: 400,
        }
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        message: error.message,
        status: 500,
      }
    } else {
      return {
        success: false,
        message: "Internal Server Error",
        status: 500,
      }
    }
  }
}

export default verifySlip

// const main = async () => {
//     const fileName = '014071184526APP07376.jpg'
//     await verifySlip(fileName)
// };

// main();
