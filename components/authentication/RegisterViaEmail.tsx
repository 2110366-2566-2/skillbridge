import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useState } from "react"

type Props = {
  handleToggleForm: () => void
  isToggleForm: boolean
}

type Error = {
  email: string,
  password: string,
  cPassword: string,
  fname: string,
  lname: string,
}

type Form = {
  email: string,
  password: string,
  cPassword: string,
  fname: string,
  lname: string,
}


export default function RegisterViaEmail({ handleToggleForm, isToggleForm }: Props) {

  const [data, setForm] = useState<Form>({
    email: "",
    password: "",
    cPassword: "",
    fname: "",
    lname: "",
  })

  const [checkBoxError, setCheckBoxError] = useState({
    checkOne: false,
    checkTwo: false
  })

  const [errors, setErrors] = useState<Error>({
    email: "",
    password: "",
    cPassword: "",
    fname: "",
    lname: "",

  })

  const validateFirstPage = () => {
    const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;
    const password_pattern = /^.{8}$/;
    const errors: Error = {
      email: '',
      password: '',
      cPassword: '',
      fname: '',
      lname: ''
    }
    if (data.email === '') {
      errors.email = 'กรอกที่อยู่อีเมลของคุณ'

    } else if (!email_pattern.test(data.email)) {
      errors.email = 'อีเมลไม่ถูกต้อง'
    }

    if (data.password === '') {
      errors.password = 'กรอกรหัสผ่านของคุณ'

    } else if (!password_pattern.test(data.password)) {
      errors.password = 'รหัสผ่านต้องมี 8 ตัวอักษร หรือมากกว่า'
    }

    if (data.cPassword === '') {
      errors.cPassword = 'กรอกรหัสผ่านของคุณ'

    } else if (data.cPassword != data.password) {
      errors.cPassword = 'รหัสผ่านไม่ตรงกัน'
    }
    console.log(errors)
    return errors
  }

  const validateSecondPage = () => {
    const errors: Error = {
      email: '',
      password: '',
      cPassword: '',
      fname: '',
      lname: '',
    }

    if (data.fname === '') {
      errors.fname = 'กรอกชื่อของคุณ'
    }

    if (data.lname === '') {
      errors.lname = 'กรอกนามสกุลของคุณ'
    }
    return errors
  }

  const handleValidationFirstPage = () => {
    const validationErrors = validateFirstPage();
    setErrors(validationErrors);

    setTimeout(() => {
      if (!validationErrors.email && !validationErrors.password && !validationErrors.cPassword) {
        handleToggleForm();
      }
    }, 0);
  }

  const handleValidationSecondPage = () => {
    setErrors(validateSecondPage());
    console.log(errors);
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...data,
      [event.target.name]: event.target.value,
    })
    // console.log(data)
  }

  const handleSubmit = (formData: FormData) => {
    // console.log(data)
  }

  return (
    <form className="w-full" action={handleValidationSecondPage} noValidate>
      {!isToggleForm ? (
        <div className="pt-[5px]">
          {/* Email Input Component */}
          <Input
            name="email"
            label="อีเมล"
            inputType="email"
            warning={errors.email}
            handleChange={handleChange}
            value={data.email}
          />

          {/* Password Input Component */}
          <PasswordInput fromLoginPage={false} handleChange={handleChange} value={data.password} warning={errors.password} />

          {/*Confirm Password Input Component */}
          <ConfirmPasswordInput handleChange={handleChange} value={data.cPassword} warning={errors.cPassword} />

          <div
            id="nextPage"
            className="w-full bg-[#334155] text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
            onClick={handleValidationFirstPage}>
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
            warning={errors.fname}
            handleChange={handleChange}
            value={data.fname}
          />
          <Input
            name="lname"
            label="นามสกุล"
            inputType="text"
            warning={errors.lname}
            handleChange={handleChange}
            value={data.lname}
          />

          <div className="mt-[30px] w-full relative">
            {/* Link ไป ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge และ นโยบายคุ้มครองความเป็นส่วนตัว*/}
            <input type="checkbox" name="checkOne"
              className="absolute cursor-pointer left-0 top-0 border
                                    border-red-200
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    "
              style={{ borderColor: checkBoxError.checkOne ? "#f87171" : "#CBD5E1", boxShadow: checkBoxError.checkOne ? "0px 0px 1px 2px rgba(248,113,113,1)" : "none" }}
              required />
            <label className="block text-[9.5px] pl-[20px]">
              ฉันได้อ่านและยอมรับ
              <Link href={'/'} className="text-[#326FE2] hover:underline hover:underline-offset">ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge</Link>
            </label>
          </div>
          <div className="mt-[10px] w-full relative">
            <input type="checkbox" name="checkTwo"
              className="absolute cursor-pointer left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    "
              required />
            <label className="block text-[9.5px] pl-[20px]">
              ฉันได้อ่านและยอมรับ
              <Link href={'/'} className="text-[#326FE2] hover:underline hover:underline-offset">นโยบายคุ้มครองความเป็นส่วนตัว</Link>
            </label>
          </div>


          <button
            id="submit"
            type="submit"
            className="w-full bg-[#334155] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md">
            สร้างบัญชี
          </button>

          <div
            id="previousPage"
            className="mt-[15px] flex justify-center">
            <p onClick={handleToggleForm} className="hover:underline hover:underline-offset text-[#334155] text-md cursor-pointer">
              ย้อนกลับ
            </p>
          </div>

        </div>
      )
      }
    </form>
  )
}
