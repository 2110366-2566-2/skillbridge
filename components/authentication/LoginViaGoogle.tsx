import { signIn } from "next-auth/react"
import Image from "next/image"

type Props = {
  callbackUrl?: string
}

export default function LoginViaGoogle({ callbackUrl = "/landing" }: Props) {
  return (
    <button
      className="w-full h-[40px] bg-[#F1F5F9] border border-[#CBD5E1] rounded-md flex items-center px-[20px]"
      onClick={() =>
        signIn("google", {
          callbackUrl,
        })
      }>
      <div>
        <Image src={"/logos/google-logo.svg"} width={20} height={20} alt="google logo" />
      </div>
      <p className="w-full font-normal font-sm leading-5">เข้าสู่ระบบด้วยบัญชี Google</p>
    </button>
  )
}
