import Input from "./Input"
import PasswordInput from "./PasswordInput"
import Link from "next/link"
import ConfirmPasswordInput from "./ConfirmPasswordInput"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import Image from "next/image"

type Form = {
  fname: string
  lname: string
}

const defaultForm = { fname: "", lname: "" }

export default function RegisterViaGoogle({
  handleToggleForm,
  isToggleForm
}: {
  handleToggleForm: () => void,
  isToggleForm: boolean
}) {

  const handleGoogleComplete = () => {
    // ถ้ากดปุ่ม Google หน้าแรกสำเร็จ
    handleToggleForm();
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
    setTimeout(async () => {
      if (!success) {
        setErrors(errors)
        return
      }

    }, 0);
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
      [event.target.name]: event.target.checked
    })
  }

  const router = useRouter()

  return (
    <div className="w-full">

    </div>

  )
}


