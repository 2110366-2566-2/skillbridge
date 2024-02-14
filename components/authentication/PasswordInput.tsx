import Image from "next/image"
import Link from "next/link";
import { useState } from "react";


export default function PasswordInput({
    fromLoginPage,
    handleChange,
    value,
    warning
}: {
    fromLoginPage: boolean,
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
    value: string,
    warning: string
}) {

    const [showPassword, setShowPassword] = useState(false);

    const handleEyeClicked = () => {
        setShowPassword(prev => !prev);
    }

    return (
        <div className="w-full mt-[12px] relative">
            <label htmlFor="password" className="text-sm leading-5 mb-[5px] inline-block">รหัสผ่าน</label>

            <input
                name="password"
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="รหัสผ่าน" className="h-[40px] border rounded-md px-[12px] focus-within:ring-2 text-md outline-none w-full"
                style={{ borderColor: warning ? "#f87171" : "#CBD5E1", boxShadow: warning ? "0px 0px 1px 2px rgba(248,113,113,1)" : "none" }}
                value={value}
                onChange={(e) => handleChange(e)}
                onFocus={(e) => {
                    e.target.style.borderColor = "#9dc0fa";
                    e.target.style.boxShadow = "0 0 1px 2px #9dc0fa";
                }}
                onBlur={(e) => {
                    e.target.style.borderColor = warning ? "#f87171" : "#CBD5E1";
                    e.target.style.boxShadow = warning ? "0px 0px 2px 2px rgba(248,113,113,1)" : "none";
                }} />

            {
                value.length >= 1 &&
                <div className="opacity-70 cursor-pointer flex items-center absolute right-2 top-[37px]">
                    <Image src={showPassword ? '/icons/eye-open.svg' : '/icons/eye-close.svg'} width={20} height={20} alt="eye" onClick={handleEyeClicked} />
                </div>
            }

            <div className="w-full flex" style={{ flexDirection: fromLoginPage ? "row-reverse" : "row", justifyContent: fromLoginPage ? "space-between" : "start" }}>
                {/* ลืมรหัสผ่านยังไม่รู้จะเป็น route ไหน */}
                {
                    fromLoginPage && <p className="mt-[6px] text-sm leading-5 text-[#326FE2] hover:underline hover:underline-offset-2 cursor-pointer"> ลืมรหัสผ่าน</p>
                }
                {
                    warning && <p className="mt-[5px] text-sm leading-5 text-[#EA4335]">{warning}</p>
                }
            </div>
        </div>
    )
}
