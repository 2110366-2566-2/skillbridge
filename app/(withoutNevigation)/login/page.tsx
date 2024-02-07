"use client"
import { signIn, signOut } from "next-auth/react"
import { Linden_Hill } from "next/font/google"
import Image from "next/image"
import Link from "next/link"

type Props = {}

export default function Login(props: Props) {
	return (
		<main className="w-full flex flex-col items-center">
			<div className="mt-[50px]">
				<Image src={'/logos/logo-black.svg'} width={150} height={60} alt="logo" />
			</div>
			<div className="flex flex-col w-[280px] mt-[40px]">
				<p className="font-bold leading-6 text-xl w-full"> เข้าสู่ระบบ </p>
				<div className="mt-[30px] text-[#64748B] leading-6 text-sm w-full">
					<button className="w-full h-[40px] bg-[#F1F5F9] border border-[#CBD5E1] rounded-md flex items-center px-[20px]"
						onClick={() =>
							signIn("google", {
								callbackUrl: "/",
							})
						}
					>
						<div>
							<Image src={'/logos/google-logo.svg'} width={20} height={20} alt="google logo" />
						</div>
						<p className="w-full font-normal font-sm leading-5">
							เข้าสู่ระบบด้วยบัญชี Google
						</p>
					</button>
					<div className="mt-[25px] flex items-center justify-center">
						<hr className="border border-t-[#CBD5E1] w-[110px] " />
						<p className="text-sm px-[10px] text-[#CBD5E1]">
							หรือ
						</p>
						<hr className="border border-t-[#CBD5E1] w-[110px] " />
					</div>
				</div>
				<form className="mt-[10px] w-full" action={"/"}>
					<div className="w-full">
						<label htmlFor="email" className="text-sm leading-5 mb-[5px] inline-block">อีเมล</label>
						<input id="email" type="email" placeholder="อีเมล" className="h-[40px] border border border-[#CBD5E1] rounded-md w-full px-[12px] text-md" />
						<p className="mt-[8px] text-sm leading-5 text-[#64748B]"> กรอกที่อยู่อีเมลของคุณ</p>
					</div>
					<div className="w-full mt-[8px] relative">
						<label htmlFor="email" className="text-sm leading-5 mb-[5px] inline-block">รหัสผ่าน</label>
						<input id="email" type="email" placeholder="รหัสผ่าน" className="h-[40px] border border border-[#CBD5E1] rounded-md w-full px-[12px] text-md" />
						<div className="absolute right-[10px] bottom-[37px] opacity-50 cursor-pointer">
							<Image src={'/icons/blind.svg'} width={22} height={22} alt="blind password" />
						</div>
						<p className="mt-[8px] text-sm leading-5 text-[#64748B] "> กรอกรหัสผ่านของคุณ</p>
					</div>
					<button className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
						เข้าสู่ระบบ
					</button>
					<p className="w-full text-center text-sm mt-[10px]">
						ไม่เคยมีบัญชี ? <Link href={"/register"} className="text-[#326FE2]">สร้างบัญชี</Link>
					</p>
				</form>
			</div>

			<button className="absolute right-8 bottom-4 bg-black text-white p-3 rounded-lg" onClick={() => signOut()}>Sign Out</button>
		</main>
	)
}
