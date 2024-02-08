"use client"

import Image from "next/image";

const nextArrowButton = require("@/public/icons/nextArrowButton.svg") as string;

export default function SearchTaskItem() {
    return (
        <>
            {/* Mobile size */}
            <div className="flex flex-row justify-between items-center min-h-[70px] pb-4 mb-4 border-b border-slate-300 md:hidden">
                <div className="flex flex-col justify-between">
                    <div className="font-bold text-[#313866]">ทำ Frontend LMS ชื่อดังในจุฬา</div>
                    <div className="flex flex-row justify-between">
                        <div className="font-medium text-[11px] text-slate-500">26/02/67 - 30/02/67</div>
                        <div className="text-[11px] text-[#838383]">สมัครแล้ว <span className="font-medium">2 / 10</span> คน</div>
                    </div>
                </div>
                <div className="flex flex-row justify-end items-center">
                    <div className="font-semibold text-[20px] text-[#313866] mr-2">฿1,000</div>
                    <Image
                        src={nextArrowButton}
                        alt="nextArrowButton"
                        width={40}
                        height={40}
                        // Open link in new tab
                        onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
                        role="link"
                        tabIndex={0}
                    />
                </div>
            </div>

            {/* Desktop size */}
            <div
                className="hidden md:inline-block md:m-[20px] md:border-[0.5px] md:border-slate-500 md:bg-slate-100 md:rounded-xl md:hover:shadow-xl md:hover:cursor-pointer"
                // Open link in new tab
                onClick={() => window.open("/", "_blank", "noopener,noreferrer")}
                role="link"
                tabIndex={0}
            >
                <div className="flex flex-col justify-between h-[340px] w-[268px] p-4">
                    <div className="h-[3em] font-bold text-[29px] text-[#313866] text-wrap line-clamp-2">รับสมัคร TA วิชา Com Prog สำหรับน้อง CEDT</div>
                    <div className="font-medium text-[15.5px] text-slate-500 text-wrap line-clamp-1">26/02/67 - 30/02/67</div>
                    <div className="text-[14px] text-slate-800">
                        <span className={`inline-block bg-slate-300 rounded py-1 px-2`}>การสอน</span>
                    </div>
                    <div className="flex flex-col">
                        <div className="font-medium text-[10.5px] text-slate-500">คำอธิบายเกี่ยวกับงาน</div>
                        <hr className="border-slate-300" />
                        <div className="h-[4.5em] text-[13px] text-[#838383] text-wrap line-clamp-3 my-[7px]">
                            รักการสอนเด็ก ๆ, มีความรู้ python numpy, ขยัน ซื่อสัตย์ ประหยัด อดทน ตกน้ำไม่ไหล ตกไฟไม่ไหม้ ยายมีขายหอย ยายมอยขายหมี วันดีคืนดี หมียายมอยไปกัดหอยยายมี ถถถถ 5555
                        </div>
                        <hr className="border-slate-300" />
                    </div>
                    <div className="flex flex-row justify-between items-end translate-y-[5px]">
                        <div className="text-[13.12px] text-slate-500">สมัครแล้ว <span className="font-semibold">2 / 10</span> คน</div>
                        <div className="font-semibold text-[24px] text-[#313866] translate-y-[5px]">฿1,000</div>
                    </div>
                </div>
            </div>
        </>
    )
}