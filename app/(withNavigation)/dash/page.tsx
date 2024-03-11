"use client"
import { signOut, useSession } from "next-auth/react"
import { NextRequest } from "next/server"
import { getServerSession } from "next-auth"
import QRCode from "react-qr-code"
import generatePayload from "promptpay-qr"
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
        <QRCode
          size={256}
          style={{ maxWidth: "100%", width: "100%" }}
          value={payload}
          viewBox={`0 0 256 256`}
        />
      </div>
    </>
  )
}
