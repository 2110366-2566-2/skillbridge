import Input from "./Input"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"
import { updateName } from "@/actions/register"
import { RegisterProps } from "./RegisterViaEmail"

type Form = {
  fname: string
  lname: string
}

const defaultForm = { fname: "", lname: "" }

export default function RegisterViaGoogle({
  handleToggleForm,
  isToggleForm,
  session,
  updateSession,
}: RegisterProps) {
  const handleGoogleComplete = () => {
    // ถ้ากดปุ่ม Google หน้าแรกสำเร็จ
    handleToggleForm()
  }

  const [data, setForm] = useState<Form>(structuredClone(defaultForm))

  const [checkBoxError, setCheckBoxError] = useState({
    checkOne: false,
    checkTwo: false,
  })

  const [errors, setErrors] = useState<Form>(structuredClone(defaultForm))

  const validateSecondPage = () => {
    const errors: Form = structuredClone(defaultForm)
    let success = true

    if (data.fname === "") {
      errors.fname = "กรอกชื่อของคุณ"
      success = false
    }

    if (data.lname === "") {
      errors.lname = "กรอกนามสกุลของคุณ"
      success = false
    }
    return { errors, success }
  }

  const handleValidationSecondPage = async () => {
    const { errors, success } = validateSecondPage()

    if (!success) {
      setErrors(errors)
      return
    }

    if (session?.user) {
      await Promise.all([
        updateName(session.user.email, data.fname, data.lname),
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
  }
  useEffect(() => {
    if (session?.user) {
      setForm({
        ...data,
        fname: session.user.salutation + " " + session.user.firstname,
        lname: session.user.middlename + " " + session.user.lastname,
      })
    }
  }, [session])

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

  const router = useRouter()

  return (
    <div className="w-full">
      {!isToggleForm ? (
        <div className="text-[#64748B] leading-6 text-sm w-full mt-[25px]">
          <button
            className="w-full h-[40px] bg-[#F1F5F9] border border-[#CBD5E1] rounded-md flex items-center px-[20px]"
            onClick={() =>
              signIn("google", {
                callbackUrl: "/register",
              })
            }>
            <div>
              <Image src={"/logos/google-logo.svg"} width={20} height={20} alt="google logo" />
            </div>
            <p className="w-full font-normal font-sm leading-5">เข้าสู่ระบบด้วยบัญชี Google</p>
          </button>
        </div>
      ) : (
        <form action={handleValidationSecondPage} noValidate>
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
              <button
                id="submit"
                type="submit"
                className="w-full bg-[#334155] hover:bg-slate-600 rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md">
                สร้างบัญชี
              </button>
            ) : (
              <div className="w-full bg-[#CBD5E1] rounded-lg text-white mt-[30px] px-[16px] py-[8px] text-md text-center cursor-pointer">
                สร้างบัญชี
              </div>
            )}

            {!session?.user && (
              <div id="previousPage" className="flex justify-center">
                <p
                  onClick={handleToggleForm}
                  className="hover:underline hover:underline-offset text-[#334155] hover:text-slate-600 text-md cursor-pointer">
                  ย้อนกลับ
                </p>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
