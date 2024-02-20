import Title from "./Title"
import { useEffect, useState } from "react"
import RegisterViaGoogle from "./RegisterViaGoogle"
import { Session } from "next-auth"

type Props = { session: Session | null; updateSession: (data?: any) => Promise<Session | null> }

export default function StudentRegister({ session, updateSession }: Props) {
  const [isToggleForm, setIsToggleForm] = useState(false)

  const handleToggleForm = () => {
    setIsToggleForm((prev) => !prev)
  }

  useEffect(() => {
    setIsToggleForm(!!session?.email)
  }, [session])

  return (
    <div className="flex flex-col w-[280px] mt-[30px]">
      <Title title="สร้างบัญชีสำหรับ" highlightText="นิสิต" highlightColor="#FF66C4" />
      <p className="mt-[22px] text-sm">ใช้อีเมลจุฬาฯ เพื่อยืนยันสถานภาพการเป็นนิสิต</p>

      <div className="text-[#64748B] leading-6 text-sm w-full">
        <RegisterViaGoogle
          handleToggleForm={handleToggleForm}
          isToggleForm={isToggleForm}
          session={session}
          updateSession={updateSession}
        />
      </div>
    </div>
  )
}
