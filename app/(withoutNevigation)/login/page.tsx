"use client"
import { signOut } from "next-auth/react"
import Logo from "@/components/authentication/Logo"
import Login from "@/components/authentication/Login"

type Props = {}

export default function LoginPage(props: Props) {

	return (
		<main className="w-full flex flex-col items-center">

			{/* Logo Component */}
			<Logo />

			{/* Login Component */}
			<Login />


			<button className="absolute right-8 bottom-4 bg-black text-white p-3 rounded-lg" onClick={() => signOut()}>Sign Out</button>
		</main>
	)
}
