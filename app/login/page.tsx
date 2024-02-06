"use client"
import { signIn, signOut } from "next-auth/react"

type Props = {}

export default function Login(props: Props) {
  return (
    <>
      <div className="">Login with google</div>
      <button
        onClick={() =>
          signIn("google", {
            callbackUrl: "/",
          })
        }>
        Sign In
      </button>
      <button onClick={() => signOut()}>Sign Out</button>
    </>
  )
}
