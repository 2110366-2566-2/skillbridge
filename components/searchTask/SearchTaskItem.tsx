"use client"
import Link from "next/link";
import Image from "next/image";

const nextArrowButton = require("@/public/icons/nextArrowButton.svg") as string;

export default function SearchTaskItem() {
    return (
        <>
            {/* Mobile size */}
            <div className="flex flex-row justify-between items-center h-[54px] pb-4 border-b border-slate-300 md:hidden">
                <div className="flex flex-col justify-between">
                    <div className="font-bold text-[#313866]">ทำ Frontend LMS ชื่อดังในจุฬา</div>
                    <div className="flex flex-row justify-between">
                        <div className="font-medium text-[11px] text-slate-500">26/02/67 - 30/02/67</div>
                        <div className="text-[11px] text-[#838383]">สมัครแล้ว <span className="font-medium">2 / 10</span> คน</div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center">
                    <div className="font-semibold text-[20px] text-[#313866] mr-2">฿1,000</div>
                    <Link href="/">
                        <Image src={nextArrowButton} alt="nextArrowButton" width={40} height={40} />
                    </Link>
                </div>
            </div>

            {/* Desktop size */}
        </>
    )
}