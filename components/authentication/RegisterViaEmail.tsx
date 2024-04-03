import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useEffect, useState } from "react"
import { registerWithCredentials, updateName } from "@/actions/register/register"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { Session } from "next-auth"
import getUniqueEmail from "@/actions/authentication/getUnique"
import { z } from "zod"
import PrimaryButton from "../public/buttons/primaryButton/PrimaryButton"

export type RegisterProps = {
  handleToggleForm: () => void
  isToggleForm: boolean
  session: Session | null
  updateSession: (data?: any) => Promise<Session | null>
}

type Form = {
  email: string
  password: string
  cPassword: string
  fname: string
  lname: string
}

const defaultForm = {
  email: "",
  password: "",
  cPassword: "",
  fname: "",
  lname: "",
}

export default function RegisterViaEmail({
  handleToggleForm,
  isToggleForm,
  session,
  updateSession,
}: RegisterProps) {
  const [data, setForm] = useState<Form>(structuredClone(defaultForm))
  const router = useRouter()

  const [checkBoxError, setCheckBoxError] = useState({
    checkOne: false,
    checkTwo: false,
  })

  const [errors, setErrors] = useState<Form>(structuredClone(defaultForm))

  const [isDisabled, setDisabled] = useState(false);
  const [primaryLoading, setPrimaryLoading] = useState(false);

  const validateFirstPage = async () => {
    const errors: Form = structuredClone(defaultForm)
    if (data.email === "") {
      errors.email = "กรอกที่อยู่อีเมลของคุณ"
    } else if (z.string().email().safeParse(data.email).success === false) {
      errors.email = "อีเมลไม่ถูกต้อง"
    } else if (await getUniqueEmail(data.email)) {
      errors.email = "อีเมลนี้มีอยู่ในระบบแล้ว"
    }

    if (data.password === "") {
      errors.password = "กรอกรหัสผ่านของคุณ"
    } else if (data.password.length < 8) {
      errors.password = "รหัสผ่านต้องมี 8 ตัวอักษร หรือมากกว่า"
    }

    if (data.cPassword === "") {
      errors.cPassword = "กรอกรหัสผ่านของคุณ"
    } else if (data.cPassword != data.password) {
      errors.cPassword = "รหัสผ่านไม่ตรงกัน"
    }

    setCheckBoxError({
      checkOne: false,
      checkTwo: false,
    })
    // console.log(errors)
    return errors
  }

  const validateSecondPage = () => {
    const errors: Form = structuredClone(defaultForm)

    if (data.fname === "") {
      errors.fname = "กรอกชื่อของคุณ"
    }

    if (data.lname === "") {
      errors.lname = "กรอกนามสกุลของคุณ"
    }
    return errors
  }

  const handleValidationFirstPage = async () => {
    const validationErrors = await validateFirstPage()
    const haveErrors = Object.values(validationErrors).some((x) => x !== null && x !== "")

    if (haveErrors) {
      setErrors(validationErrors)
    } else {
      handleToggleForm()
    }
  }

  const handleValidationSecondPage = async () => {
    setPrimaryLoading((prev) => !prev);
    setDisabled(true);
    const validationErrors = validateSecondPage()
    const haveErrors = Object.values(validationErrors).some((x) => x !== null && x !== "")

    if (haveErrors) {
      setTimeout(() => {
        setErrors(validationErrors);
        setPrimaryLoading((prev) => !prev);
        setDisabled(false);
      }, 2000);
      return
    }

    if (session?.user) {
      await Promise.all([
        updateName(data.email, data.fname, data.lname),
        updateSession({
          user: {
            firstname: data.fname,
            lastname: data.lname,
            hashedPassword: "completed",
          },
        }),
      ])

      router.push("/landing")
      return
    }

    const res = await registerWithCredentials(data)

    if (res) {
      signIn("credentials", {
        email: data.email,
        password: data.password,
        callbackUrl: "/landing",
      })
    } else router.push("/login")
    // console.log(errors)
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...data,
      [event.target.name]: event.target.value,
    })
    // console.log(data)
  }

  const handleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckBoxError({
      ...checkBoxError,
      [event.target.name]: event.target.checked,
    })
  }

  useEffect(() => {
    if (session?.user) {
      setForm({
        ...data,
        email: session.email,
        fname: session.user.salutation + " " + session.user.firstname,
        lname: session.user.middlename + " " + session.user.lastname,
      })
    }
  }, [session])

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
          <PasswordInput
            fromLoginPage={false}
            handleChange={handleChange}
            value={data.password}
            warning={errors.password}
          />

          {/*Confirm Password Input Component */}
          <ConfirmPasswordInput
            handleChange={handleChange}
            value={data.cPassword}
            warning={errors.cPassword}
          />

          <div
            id="nextPage"
            className="w-full bg-[#334155] hover:bg-slate-600 text-center cursor-pointer rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
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
            <input
              type="checkbox"
              name="checkOne"
              id="checkOne"
              className="absolute left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    cursor-pointer
                                    rounded-sm
                                    "
              onChange={(e) => {
                handleCheckBoxChange(e)
              }}
              required
            />
            <label htmlFor="checkOne" className="block text-[9.5px] pl-[20px] cursor-pointer">
              ฉันได้อ่านและยอมรับ
              <Link href={"/"} className="text-[#326FE2] hover:underline hover:underline-offset">
                ข้อตกลงและเงื่อนไขการใช้งานของ SkillBridge
              </Link>
            </label>
          </div>
          <div className="mt-[10px] w-full relative">
            <input
              type="checkbox"
              name="checkTwo"
              id="checkTwo"
              className="absolute cursor-pointer left-0 top-0 border
                                    border-[#848484]
                                    accent-[#334155]
                                    rounded-sm
                                    "
              onChange={(e) => {
                handleCheckBoxChange(e)
              }}
              required
            />
            <label htmlFor="checkTwo" className="block text-[9.5px] pl-[20px] cursor-pointer">
              ฉันได้อ่านและยอมรับ
              <Link href={"/"} className="text-[#326FE2] hover:underline hover:underline-offset">
                นโยบายคุ้มครองความเป็นส่วนตัว
              </Link>
            </label>
          </div>

          {checkBoxError.checkOne && checkBoxError.checkTwo ? (
            <PrimaryButton
              type="submit"
              isDisabled={isDisabled}
              className="w-full bg-[#334155] hover:bg-slate-600 rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md"
              isLoading={primaryLoading}
              loadingMessage="กรุณารอสักครู่"
            >
              สร้างบัญชี
            </PrimaryButton>
          ) : (
            <div className="w-full bg-[#CBD5E1] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md text-center cursor-pointer">
              สร้างบัญชี
            </div>
          )}

          {!session?.user && (
            <div id="previousPage" className="mt-[15px] flex justify-center">
              <p
                onClick={handleToggleForm}
                className="hover:underline hover:underline-offset text-[#334155] hover:text-slate-600 text-md cursor-pointer">
                ย้อนกลับ
              </p>
            </div>
          )}
        </div>
      )}
    </form>
  )
}
