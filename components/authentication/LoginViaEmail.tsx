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
    const password_pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/
    const errors: Error = {
      email: "",
      password: "",
    }
    if (form.email === "") {
      errors.email = "กรอกที่อยู่อีเมลของคุณ"
    } else if (!email_pattern.test(form.email)) {
      // ไม่รู้ใช้คำไรดี
      errors.email = "อีเมลไม่ถูกต้อง"
    }

    if (form.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ"
    } else if (!password_pattern.test(form.password)) {
      // ไม่รู้ใช้คำไรดี
      //   errors.password = "รหัสผ่านไม่ถูกต้อง"
    }
    // console.log(errors)
    return errors
  }

  const handleValidation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors(validateForm())
    signIn(
      "credentials",
      {
        email: form.email,
        password: form.password,
        callbackUrl: "/",
      },
      { login_hint: "info@example.com" }
    )
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
        className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md ">
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
