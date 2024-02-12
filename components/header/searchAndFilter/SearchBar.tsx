"use client"

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const searchIcon = require("@/public/icons/jobSearch.svg") as string;
const searchBigIcon = require("@/public/icons/jobSearchBig.svg") as string;

export default function SearchBar() {
    const [searchValue, setSearchValue] = useState("")
    const router = useRouter();

    const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(evt.target.value);
        // console.log(evt.target.value);
    };

    const handleSubmit = (evt: FormEvent) => {
        evt.preventDefault();
        // console.log(searchValue)
        router.push(`/search?q=${searchValue}`);
    };

    return (
        <>
            {/* Mobile, Tablet and Desktop size */}
            <form onSubmit={handleSubmit}>
                <div className="relative w-full lg:ml-4 lg:min-w-[35vw] lg:max-w-[498px]">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <Image
                            src={searchIcon}
                            alt="searchIcon"
                            width={16}
                            height={16}
                            className="lg:hidden"
                        />
                        <Image
                            src={searchBigIcon}
                            alt="searchBigIcon"
                            width={24}
                            height={24}
                            className="hidden lg:inline-block"
                        />
                    </div>
                    <input
                        type="search"
                        id="job-search"
                        className="w-full min-h-[40px] ps-10 text-[14px] text-slate-900 border border-slate-300 rounded bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-500 lg:min-h-[48px] lg:ps-12 lg:text-[16px] lg:rounded-lg lg:focus:ring-4"
                        placeholder="ค้นหางานที่ต้องการ..."
                        name="job-search"
                        value={searchValue}
                        onChange={handleChange}
                        required
                    />
                    <button
                        type="submit"
                        className="hidden lg:block lg:min-w-[84px] lg:min-h-[38px] lg:text-white lg:text-[14px] lg:rounded lg:absolute lg:end-[5px] lg:bottom-[5px] lg:bg-slate-800 lg:hover:bg-slate-700 lg:focus:ring-4 lg:focus:outline-none flg:ocus:ring-slate-400"
                    >
                        ค้นหา
                    </button>
                </div>
            </form>
        </>
    )
}