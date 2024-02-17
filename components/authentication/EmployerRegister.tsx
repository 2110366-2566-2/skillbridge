import Title from "./Title"
import LoginViaGoogle from "./LoginViaGoogle"
import Line from "./Line"
import RegisterViaEmail from "./RegisterViaEmail"
import { useEffect, useState } from "react"

type Props = { isLoggedIn: boolean }

export default function EmployerRegister({ isLoggedIn }: Props) {
  const [isToggleForm, setIsToggleForm] = useState(isLoggedIn)
  console.log("isToggleForm", isToggleForm)

  const handleToggleForm = () => {
    setIsToggleForm((prev) => !prev)
  }
  useEffect(() => {
    setIsToggleForm(isLoggedIn)
  }, [isLoggedIn])

  return (
    <div className="flex flex-col w-[280px] mt-[30px]">
      <Title title="สร้างบัญชีสำหรับ" highlightText="ผู้ว่าจ้าง" highlightColor="#48953D" />

      {!isToggleForm && (
        <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
          <LoginViaGoogle />
          <Line />
        </div>
      )}

      <RegisterViaEmail handleToggleForm={handleToggleForm} isToggleForm={isToggleForm} />
    </div>
  )
}
