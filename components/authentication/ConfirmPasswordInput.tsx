import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

export default function ConfirmPasswordInput() {
    const [showPassword, setShowPassword] = useState(false);

    const handleEyeClicked = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="w-full mt-[12px]">
            <label htmlFor="cPassword" className="text-sm leading-5 mb-[5px] inline-block">ยืนยันรหัสผ่าน</label>
            <div className="h-[40px] border border-[#CBD5E1] rounded-md px-[12px] focus-within:ring-2 flex item-center">
                <input id="cPassword" type={showPassword ? 'text' : 'password'} placeholder="ยืนยันรหัสผ่าน" className="h-full text-md outline-none w-full" />
                <div className="opacity-70 cursor-pointer flex items-center">
                    <Image src={showPassword ? '/icons/eye-close.svg' : '/icons/eye-open.svg'} width={22} height={22} alt="eye" onClick={handleEyeClicked} />
                </div>
            </div>
            <div className="w-full flex flex-row-reverse justify-between">
                <p className="mt-[6px] text-sm leading-5 text-[#64748B] hidden"> กรอกรหัสผ่านของคุณ</p>
            </div>
        </div>
    )
}
