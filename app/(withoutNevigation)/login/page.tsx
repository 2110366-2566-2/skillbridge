"use client"
import { signIn, signOut } from "next-auth/react"

type Props = {}

export default function Login(props: Props) {
	return (
		<main className="w-full flex flex-col items-center">
			<div className="mt-[50px]">
				logo image
			</div>
			<div className="flex flex-col w-[280px] mt-[40px]">
				<p> เข้าสู่ระบบ </p>
				<div className="mt-[30px] ">
					<button className="w-full h-[40px] bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg flex items-center px-[20px]"
						onClick={() =>
							signIn("google", {
								callbackUrl: "/",
							})
						}
					>
						<div>
							{/* <Image src={'/img/google-logo.png'} width={20} height={20} alt="google logo" /> */}
						</div>
						<p className="w-full text-right">
							เข้าสู่ระบบด้วยบัญชี Google
						</p>
					</button>
					<div>

					</div>

				</div>
			</div>
			<button onClick={() => signOut()}>Sign Out</button>
		</main>
	)
}
