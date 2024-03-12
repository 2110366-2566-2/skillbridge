"use client"
import { signOut, useSession } from "next-auth/react"
import { getServerSession } from "next-auth"
import QRCode from "react-qr-code"
import generatePayload from "promptpay-qr"
import { toJpeg } from "html-to-image"
import getPaymentsInfo from "@/actions/payment/getPaymentsInfo"
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
    const data = await getPaymentsInfo("0b6fcb5c-fdc6-4fb3-aa1b-247a4d9f206a")
    console.log(data)
  }

  const convertImage = async (element: HTMLElement) => {
    let dataUrl = ""
    const minDataLength = 150000
    const maxAttempts = 20

    for (let i = 0; dataUrl.length < minDataLength && i < maxAttempts; ++i) {
      dataUrl = await toJpeg(element, { quality: 0.95 })
    }

    return dataUrl
  }

  const downloadImage = async () => {
    const postcard = document.getElementById("qr")
    if (!postcard) return

    const dataUrl = await convertImage(postcard)

    const link = document.createElement("a")
    link.download = "PromptpayQR.jpeg"
    link.href = dataUrl
    link.click()
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
        <button onClick={downloadImage}>Download</button>
        <button onClick={getData}>GetData</button>
      </div>
    </>
  )
}
