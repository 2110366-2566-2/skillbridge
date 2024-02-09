import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"


export default function LoginViaEmail() {
    return (
        <form className="mt-[10px] w-full" action={"/"}>

            {/* Email Input Component */}
            <Input name="email" label="อีเมล" inputType="email" warning="กรอกที่อยู่อีเมลของคุณ" />

            {/* Password Input Component */}
            <PasswordInput fromLoginPage={true} />

            <button className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
                เข้าสู่ระบบ
            </button>

            <p className="w-full text-center text-sm mt-[10px]">
                ไม่เคยมีบัญชี ? <Link href={"/register"} className="text-[#326FE2]">สร้างบัญชี</Link>
            </p>
        </form>
    )
}
