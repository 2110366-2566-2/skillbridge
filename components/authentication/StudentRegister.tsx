import Title from "./Title"
import { useEffect, useState } from "react"
import RegisterViaGoogle from "./RegisterViaGoogle"

type Props = { loggedinEmail: string }

export default function StudentRegister({ loggedinEmail }: Props) {
  const [isToggleForm, setIsToggleForm] = useState(false)

  const handleToggleForm = () => {
    setIsToggleForm((prev) => !prev)
  }

  useEffect(() => {
    setIsToggleForm(!!loggedinEmail)
  }, [loggedinEmail])

  return (
    <div className="flex flex-col w-[280px] mt-[30px]">
      <Title title="สร้างบัญชีสำหรับ" highlightText="นิสิต" highlightColor="#FF66C4" />
      <p className="mt-[22px] text-sm">ใช้อีเมลจุฬาฯ เพื่อยืนยันสถานภาพการเป็นนิสิต</p>

      <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
        <RegisterViaGoogle
          handleToggleForm={handleToggleForm}
          isToggleForm={isToggleForm}
          loggedinEmail={loggedinEmail}
        />
      </div>
    </div>
  )
}
