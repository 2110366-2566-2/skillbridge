"use server"

import Image from "next/image";
import noavatar from "@/public/icons/noavatar.svg";

type Props = {
    employerData: {
        firstName: string;
        middleName: string;
        lastName: string;
        position: string;
        organization: string;
    };
};

export default async function EmployerDetail({ employerData }: Props) {
    const avatar = noavatar

    return (
        <>
            <div className="w-full bg-slate-100 rounded-b-[9.54px] border-slate-300 border-[1px] flex flex-col px-6 py-3 md:w-[50%] lg:w-[45%]">
                <div className="font-semibold text-[14px] text-slate-800 lg:text-[16px]">ผู้ว่าจ้าง</div>
                <div className="flex flex-row mt-2">
                    <Image
                        className="rounded-full translate-x-1"
                        src={avatar}
                        alt="avatar"
                        width={40}
                        height={40}
                    />
                    <div className="flex flex-col ml-5 lg:ml-6 hover:underline hover:cursor-pointer">
                        <div className="font-medium text-[14px] text-slate-800 lg:text-[16px]">{employerData.firstName} {employerData.middleName} {employerData.lastName}</div>
                        <div className="text-[11px] text-slate-800 line-clamp-1 lg:text-[13px]">{employerData.position} {employerData.organization}</div>
                    </div>
                </div>
            </div>
        </>
    )
}