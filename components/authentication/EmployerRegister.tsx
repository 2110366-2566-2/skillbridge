import Title from "./Title"
import LoginViaGoogle from "./LoginViaGoogle"
import Line from "./Line"
import RegisterViaEmail from "./RegisterViaEmail"
import { useEffect, useState } from "react"
import { Session } from "next-auth"

type Props = { session: Session | null; updateSession: (data?: any) => Promise<Session | null> }

export default function EmployerRegister({ session, updateSession }: Props) {
  const [isToggleForm, setIsToggleForm] = useState(false)

  const handleToggleForm = () => {
    setIsToggleForm((prev) => !prev)
  }

  useEffect(() => {
    setIsToggleForm(!!session?.email)
  }, [session])

  return (
    <div className="flex flex-col w-[280px] mt-[30px]">
      <Title title="สร้างบัญชีสำหรับ" highlightText="ผู้ว่าจ้าง" highlightColor="#48953D" />

      {!isToggleForm && (
        <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
          <LoginViaGoogle callbackUrl="/register" />
          <Line />
        </div>
      )}

      <RegisterViaEmail
        handleToggleForm={handleToggleForm}
        isToggleForm={isToggleForm}
        session={session}
        updateSession={updateSession}
      />
    </div>
  )
}
