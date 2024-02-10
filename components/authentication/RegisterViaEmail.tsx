import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useState } from "react"

type Props = {
  handleFirstFormComplete: () => void
  isFirstFormComplete: boolean
}

export default function RegisterViaEmail({ handleFirstFormComplete, isFirstFormComplete }: Props) {
  const handleNextPageSubmit = () => {
    handleFirstFormComplete()
  }

  const [data, setForm] = useState({
    email: "",
    password: "",
    cPassword: "",
    fname: "",
    lname: "",
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...data,
      [event.target.name]: event.target.value,
    })
    console.log(data)
  }

  const handleSubmit = (formData: FormData) => {
    console.log(data)
  }

  return (
    <form className="w-full" action={handleSubmit}>
      {!isFirstFormComplete ? (
        <div className="pt-[5px]">
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
          <PasswordInput fromLoginPage={false} handleChange={handleChange} value={data.password} />

          {/*Confirm Password Input Component */}
          <ConfirmPasswordInput handleChange={handleChange} value={data.cPassword} />

          <div
            id="nextPage"
            className="w-full bg-[#334155] text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
            onClick={handleNextPageSubmit}>
            ถัดไป
          </div>

          <p className="w-full text-center text-sm mt-[10px]">
            มีบัญชีอยู่แล้ว ?{" "}
            <Link
              href={"/login"}
              className="text-[#326FE2] hover:underline hover:underline-offset-2">
              เข้าสู่ระบบ
            </Link>
          </p>
        </div>
      ) : (
        <div className={"pt-[10px] flex flex-col"}>
          <Input
            name="fname"
            label="ชื่อ"
            inputType="text"
            warning="กรอกชื่อของคุณ"
            handleChange={handleChange}
            value={data.fname}
          />
          <Input
            name="lname"
            label="นามสกุล"
            inputType="text"
            warning="กรอกนามสกุลของคุณ"
            handleChange={handleChange}
            value={data.lname}
          />

          <div className="mt-[20px]">
            {/* Link ไป ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge และ นโยบายคุ้มครองความเป็นส่วนตัว*/}
            <label className="block relative mb-[10px] text-[9.5px] pl-[20px]">
              ฉันได้อ่านและยอมรับ
              <Link href={"/"} className="text-[#326FE2]">
                ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge
              </Link>
              <input
                type="checkbox"
                name=""
                className="absolute cursor-pointer left-0
                                    checked:bg-[#334155] hover:bg-[#a3a3a3]
                                    w-[14px] h-[14px] rounded-sm focus:outline-none
                                    hover:ring hover:"
              />
            </label>

            <label className="block relative text-[9.5px] pl-[20px] ">
              ฉันได้อ่านและยอมรับ
              <Link href={"/"} className="text-[#326FE2]">
                นโยบายคุ้มครองความเป็นส่วนตัว
              </Link>
              <input
                type="checkbox"
                name=""
                className="absolute cursor-pointer left-0 checked:bg-[#334155]"
              />
            </label>
          </div>

          <button
            id="submit"
            type="submit"
            className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md">
            สร้างบัญชี
          </button>

          <button
            id="previousPage"
            type="button"
            className="mt-[20px] text-[#334155] text-md"
            onClick={handleNextPageSubmit}>
            ย้อนกลับ
          </button>
        </div>
      )}
    </form>
  )
}
