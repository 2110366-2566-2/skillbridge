import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function LoginViaEmail() {
  const [data, setData] = useState({
    email: "",
    password: "",
  })

  const router = useRouter()

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = () => {
    signIn("credentials", {
      ...data,
      redirect: false,
    })
    router.push("/loggedin")
  }

  return (
    <form className="mt-[10px] w-full" action={handleSubmit}>
      {/* Email Input Component */}
      <Input
        name="email"
        label="อีเมล"
        inputType="email"
        warning="กรอกที่อยู่อีเมลของคุณ"
        handleChange={handleChange}
        value={data.email}
      />

      {/* Password Input Component */}
      <PasswordInput fromLoginPage={true} handleChange={handleChange} value={data.password} />

      <button
        className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md "
        type="submit">
        เข้าสู่ระบบ
      </button>

      <p className="w-full text-center text-sm mt-[10px]">
        ไม่เคยมีบัญชี ?{" "}
        <Link
          href={"/register"}
          className="text-[#326FE2] hover:underline hover:underline-offset-2">
          สร้างบัญชี
        </Link>
      </p>
    </form>
  )
}
