import Image from "next/image"
import Link from "next/link";
import { useState } from "react";


export default function PasswordInput({ fromLoginPage }: { fromLoginPage: boolean }) {

    const [showPassword, setShowPassword] = useState(false);

    const handleEyeClicked = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="w-full mt-[12px]">
            <label htmlFor="password" className="text-sm leading-5 mb-[5px] inline-block">รหัสผ่าน</label>
            <div className="h-[40px] border border-[#CBD5E1] rounded-md px-[12px] focus-within:ring-2 flex item-center">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} placeholder="รหัสผ่าน" className="h-full text-md outline-none w-full" />
                <div className="opacity-70 cursor-pointer flex items-center">
                    <Image src={showPassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'} width={22} height={22} alt="eye" onClick={handleEyeClicked} />
                </div>
            </div>
            <div className="w-full flex" style={{ flexDirection: fromLoginPage ? "row-reverse" : "row", justifyContent: fromLoginPage ? "space-between" : "start" }}>
                {/* ลืมรหัสผ่านยังไม่รู้จะเป็น route ไหน */}
                {
                    fromLoginPage ? <Link href={'/'} className="mt-[6px] text-sm leading-5 text-[#326FE2] "> ลืมรหัสผ่าน</Link>
                        : null
                }
                <p className="mt-[5px] text-sm leading-5 text-[#64748B] hidden"> กรอกรหัสผ่านของคุณ</p>
            </div>
        </div>
    )
}
