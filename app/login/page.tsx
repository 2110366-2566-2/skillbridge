"use client"
import { signIn, signOut } from "next-auth/react"

type Props = {}

export default function Login(props: Props) {
  return (
    <>
      <div className="flex flex-col">
        <div className="">Login with google</div>
        <button
          onClick={() =>
            signIn("google", {
              callbackUrl: "/",
            })
          }>
          Sign In with Google
        </button>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    </>
  )
}
