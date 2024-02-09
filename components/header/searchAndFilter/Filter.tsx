"use client"

import Image from "next/image";

const filterIcon = require("@/public/icons/filter.svg") as string;
const filterDarkIcon = require("@/public/icons/filterDark.svg") as string;

export default function Filter() {
    return (
        <>
            {/* Mobile */}
            <div className="md:hidden">
                <Image
                    src={filterIcon}
                    alt="filterIcon"
                    width={24}
                    height={24}
                />
            </div>

            {/* Tablet and Desktop */}
            <div className="hidden md:flex md:flex-row md:items-center md:justify-center md:min-w-[99px] md:min-h-[40px] md:bg-slate-300 md:rounded-[6px] lg:min-w-[109px] lg:min-h-[48px]">
                <div className="">
                    <Image
                        src={filterDarkIcon}
                        alt="filterDarkIcon"
                        width={24}
                        height={24}
                    />
                </div>
                <div className="ml-2 font-medium text-[14px] lg:text-[16px] text-slate-900">ตัวกรอง</div>
            </div>
        </>
    )
}