"use client"

import Image from "next/image";

const searchIcon = require("@/public/icons/taskSearch.svg") as string;
const searchBigIcon = require("@/public/icons/taskSearchBig.svg") as string;

export default function SearchBar() {
    return (
        <>
            {/* Mobile and Tablet size */}
            <div className="lg:hidden">
                <form>
                    <div className="relative w-full">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Image
                                src={searchIcon}
                                alt="searchIcon"
                                width={16}
                                height={16}
                            />
                        </div>
                        <input type="search" id="task-search" className="block w-full min-h-[40px] ps-10 text-[14px] text-slate-900 border border-slate-300 rounded bg-slate-50 focus:border-slate-400" placeholder="ค้นหางานที่ต้องการ..." required></input>
                    </div>
                </form>
            </div>

            {/* Desktop */}
            <div className="hidden lg:inline-block">
                <form>
                    <div className="relative min-w-[498px]">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                            <Image
                                src={searchBigIcon}
                                alt="searchBigIcon"
                                width={24}
                                height={24}
                            />
                        </div>
                        <input type="search" id="task-search" className="block w-full min-h-[48px] ps-12 text-[16px] text-slate-900 border border-slate-300 rounded-lg bg-slate-50 focus:border-slate-500" placeholder="ค้นหางานที่ต้องการ..." required></input>
                        <button type="submit" className="min-w-[84px] min-h-[38px] text-white text-[14px] rounded absolute end-[5px] bottom-[5px] bg-slate-800 hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-slate-400">ค้นหา</button>
                    </div>
                </form>
            </div>
        </>
    )
}