"use client"

import Image from "next/image";

const searchIcon = require("@/public/icons/taskSearch.svg") as string;

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
                        <input type="search" id="task-search" className="block w-full min-h-[40px] ps-10 text-[14px] text-slate-900 border border-slate-300 rounded bg-slate-50 focus:ring-blue-500 focus:border-blue-500" placeholder="ค้นหางานที่ต้องการ..." required></input>
                    </div>
                </form>
            </div>
        </>
    )
}