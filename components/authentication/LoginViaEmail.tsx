import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"


export default function LoginViaEmail() {

    const [Form, setForm] = useState({
        email: '',
        password: ''
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...Form,
            [event.target.name]: event.target.value
        })
    }

    return (
        <form className="mt-[10px] w-full" action={"/"}>

            {/* Email Input Component */}
            <Input name="email" label="อีเมล" inputType="email" warning="กรอกที่อยู่อีเมลของคุณ" handleChange={handleChange} value={Form.email} />

            {/* Password Input Component */}
            <PasswordInput fromLoginPage={true} handleChange={handleChange} value={Form.password} />

            <button className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
                เข้าสู่ระบบ
            </button>

            <p className="w-full text-center text-sm mt-[10px]">
                ไม่เคยมีบัญชี ? <Link href={"/register"} className="text-[#326FE2] hover:underline hover:underline-offset-2">สร้างบัญชี</Link>
            </p>
        </form>
    )
}
