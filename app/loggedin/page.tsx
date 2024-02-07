"use client"
import { useSession } from "next-auth/react"
import Image from "next/image"

export default function LoggedIn() {
  const { data: session } = useSession()
  if (!session)
    return (
      <>
        <div className="">Not Logged in</div>
      </>
    )
  return (
    <>
      <div className="flex flex-col">
        <h1>{session.user?.name}</h1>
        <p>Email: {session.user?.email}</p>
        {session.user?.image && (
          <Image src={session.user?.image} alt="profile" height={100} width={100}></Image>
        )}
      </div>
    </>
  )
}
