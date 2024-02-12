import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

export default function ConfirmPasswordInput({
    handleChange,
    value,
    warning
}: {
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
    warning: string
}) {

    const [showPassword, setShowPassword] = useState(false);

    const handleEyeClicked = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="w-full mt-[12px] relative">
            <label htmlFor="cPassword" className="text-sm leading-5 mb-[5px] inline-block">ยืนยันรหัสผ่าน</label>

            <input
                name="cPassword"
                id="cPassword"
                type={showPassword ? 'text' : 'password'}
                placeholder="ยืนยันรหัสผ่าน"
                className="h-[40px] border rounded-md px-[12px] focus-within:ring-2 text-md outline-none w-full"
                style={{ borderColor: warning ? "#f87171" : "#CBD5E1", boxShadow: warning ? "0px 0px 1px 2px rgba(248,113,113,1)" : "none" }}
                value={value}
                onChange={(e) => handleChange(e)} />

            {
                value.length >= 1 &&
                <div className="opacity-70 cursor-pointer flex items-center absolute right-2 top-[37px]">
                    <Image src={showPassword ? '/icons/eye-open.svg' : '/icons/eye-close.svg'} width={20} height={20} alt="eye" onClick={handleEyeClicked} />
                </div>
            }

            <div className="w-full flex">
                {
                    warning && <p className="mt-[5px] text-sm leading-5 text-[#EA4335]">{warning}</p>
                }
            </div>
        </div>
    )
}
