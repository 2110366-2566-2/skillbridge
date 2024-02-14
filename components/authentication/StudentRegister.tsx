import Title from "./Title"
import LoginViaGoogle from "./LoginViaGoogle"
import Line from "./Line"
import RegisterViaEmail from "./RegisterViaEmail"

export default function StudentRegister() {
    return (
        <div className="flex flex-col w-[280px] mt-[30px]">

            <Title title='สร้างบัญชีสำหรับ' highlightText='นิสิต' highlightColor='#FF66C4' />

            <p className="mt-[22px] text-sm">ใช้อีเมลจุฬาฯ เพื่อยืนยันสถานภาพการเป็นนิสิต</p>

            <div className="mt-[25px] text-[#64748B] leading-6 text-sm w-full">
                <LoginViaGoogle />
            </div>


        </div>
    )
}
