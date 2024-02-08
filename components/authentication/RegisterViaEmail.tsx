import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"

export default function RegisterViaEmail() {
    return (
        <form className="mt-[10px] w-full" action={"/"}>

            {/* Email Input Component */}
            <Input label="อีเมล" inputType="email" warning="กรอกที่อยู่อีเมลของคุณ" />

            {/* Password Input Component */}
            <PasswordInput fromLoginPage={false} />

            {/*Confirm Password Input Component */}
            <ConfirmPasswordInput />

            <button className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
                ถัดไป
            </button>

            <p className="w-full text-center text-sm mt-[10px]">
                มีบัญชีอยู่แล้ว ? <Link href={"/login"} className="text-[#326FE2]">เข้าสู่ระบบ</Link>
            </p>
        </form>
    )
}
