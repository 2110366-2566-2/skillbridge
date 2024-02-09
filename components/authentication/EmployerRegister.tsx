import Title from "./Title"
import LoginViaGoogle from "./LoginViaGoogle"
import Line from "./Line"
import RegisterViaEmail from "./RegisterViaEmail"
import { useState } from "react"

export default function EmployerRegister() {

    const [isFirstFormComplete, setIsFirstFormComplete] = useState(false);

    const handleFirstFormComplete = () => {
        setIsFirstFormComplete(prev => !prev);
    }

    return (
        <div className="flex flex-col w-[280px] mt-[30px]">

            <Title title='สร้างบัญชีสำหรับ' highlightText='ผู้ว่าจ้าง' highlightColor='#48953D' />

            {
                !isFirstFormComplete ?
                    <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
                        <LoginViaGoogle />
                        <Line />
                    </div>
                    :
                    null
            }

            <RegisterViaEmail handleFirstFormComplete={handleFirstFormComplete} isFirstFormComplete={isFirstFormComplete} />

        </div>
    )
}
