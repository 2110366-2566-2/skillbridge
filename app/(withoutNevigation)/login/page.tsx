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



		</main>
	)
}
