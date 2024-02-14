"use client"
import { signOut, useSession } from "next-auth/react"
import { NextRequest } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from './app/api/auth/[...nextauth]/auth';


export default function LoggedIn() {
  // const session = await getServerSession(authOptions) //Server
  const { data: session } = useSession() //Client

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
      </div>
    </>
  )
}
