import Link from "next/link"
import Input from "./Input"
import PasswordInput from "./PasswordInput"
import { useState } from "react"
import { signIn } from "next-auth/react"

type Error = {
  email: string
  password: string
}

type Form = {
  email: string
  password: string
}

export default function LoginViaEmail() {
  const [form, setForm] = useState<Form>({
    email: "",
    password: "",
  })

  const [errors, setErrors] = useState<Error>({
    email: "",
    password: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    })
  }

  const validateForm = () => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/
    // const password_pattern = /^.{8}$/
    let success = true
    const errors: Error = {
      email: "",
      password: "",
    }
    if (form.email === "") {
      errors.email = "กรอกที่อยู่อีเมลของคุณ"
      success = false
    } else if (!email_pattern.test(form.email)) {
      errors.email = "อีเมลไม่ถูกต้อง"
      success = false
    }

    if (form.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ"
      success = false
    } else if (form.password.length < 8) {
      errors.password = "รหัสผ่านไม่ถูกต้อง"
      success = false
    }

    return { errors, success }
  }

  const handleValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { errors, success } = validateForm()
    if (!success) {
      setErrors(errors)
      return
    } else {
      signIn("credentials", {
        email: form.email,
        password: form.password,
        callbackUrl: "/landing",
      })
    }
  }

  return (
    <form className="mt-[10px] w-full" onSubmit={handleValidation} noValidate>
      {/* Email Input Component */}
      <Input
        name="email"
        label="อีเมล"
        inputType="email"
        warning={errors.email}
        handleChange={handleChange}
        value={form.email}
      />

      {/* Password Input Component */}
      <PasswordInput
        fromLoginPage={true}
        handleChange={handleChange}
        value={form.password}
        warning={errors.password}
      />

      <button
        type="submit"
        className="w-full bg-[#334155] hover:bg-slate-600 rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
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
