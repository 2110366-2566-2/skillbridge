"use client"
import { signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import QRCode from "react-qr-code"
import generatePayload from "promptpay-qr"
import { toJpeg } from "html-to-image"
import { getPaymentInfo } from "@/actions/payment/paymentinfo"
import { downloadImage } from "@/lib/utils"
// import { authOptions } from "./app/api/auth/[...nextauth]/auth";

export default function LoggedIn() {
  // const session = await getServerSession(authOptions) //Server
  const { data: session } = useSession() //Client
  const payload = generatePayload("0897991699", { amount: 100 })
  if (!session)
    return (
      <>
        <div className="">Not Logged in</div>
      </>
    )

  console.log(session)
  const getData = async () => {
    const data = await getPaymentInfo(
      "0b6fcb5c-fdc6-4fb3-aa1b-247a4d9f206a",
      "753ec45a-3b3d-41ce-b801-53b2416e6c24"
    )
    console.log(data)
  }

  return (
    <>
      <div className="flex flex-col">
        <p>{JSON.stringify(session, null, 2)}</p>
        <button
          onClick={() => {
            signOut({ callbackUrl: process.env.NEXTAUTH_URL })
          }}>
          Log out
        </button>
        <QRCode size={256} id="qr" value={payload} viewBox={`0 0 256 256`} />
        <button
          onClick={() => {
            downloadImage("qr", "PromptpayQR.jpeg")
          }}>
          Download
        </button>
        <button onClick={getData}>GetData</button>
      </div>
    </>
  )
}
