import Logo from "@/components/authentication/Logo"
import Login from "@/components/authentication/Login"

type Props = {}

export default function LoginPage(props: Props) {

	return (
		<main className="w-full flex flex-col items-center bg-[#F8FAFC] h-full flex justify-center">
			<div className="flex flex-col items-center w-[381px] h-[813px] md:bg-white md:shadow-xl">
				{/* Logo Component */}
				<Logo />

				{/* Login Component */}
				<Login />
			</div>
		</main>
	)
}
