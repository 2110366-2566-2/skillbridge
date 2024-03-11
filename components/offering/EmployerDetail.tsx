"use server"

import Image from "next/image";
import noavatar from "@/public/icons/noavatar.svg";

export default async function EmployerDetail() {
    const avatar = noavatar

    return (
        <>
            <div className="w-full bg-slate-100 rounded-b-[9.54px] border-slate-300 border-[2px] flex flex-col px-6 py-3 lg:w-[543px]">
                <div className="font-semibold text-[14px] text-slate-800">ผู้ว่าจ้าง</div>
                <div className="flex flex-row mt-2">
                    <Image
                        className="rounded-full translate-x-1"
                        src={avatar}
                        alt="avatar"
                        width={36}
                        height={36}
                    />
                    <div className="flex flex-col ml-5">
                        <div className="font-medium text-[14px] text-slate-800">Awat Singdamrong</div>
                        <div className="text-[11px] text-slate-800 line-clamp-1">Co-Founder บริษัทน้องบิวสั่งข้าว จำกัด (มหาชน) ประเทศไทย ภูมิภาคเอเชีย</div>
                    </div>
                </div>
            </div>
        </>
    )
}