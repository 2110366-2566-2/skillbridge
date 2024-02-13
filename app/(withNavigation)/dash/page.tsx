"use client"
import { signOut, useSession } from "next-auth/react"

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
            signOut()
          }}>
          Log out
        </button>
      </div>
    </>
  )
}
