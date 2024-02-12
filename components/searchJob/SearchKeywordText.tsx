"use client"

import { useState } from "react"
import Image from "next/image";

const logoTextBlack = require("@/public/logos/logo-text-black.svg") as string;

export default function SearchKeywordText() {
    const [keyword, setKeyword] = useState("") // TODO: Make this work using Redux

    return (
        <>
            {keyword ? (
                <div className="text-3xl text-slate-800 h-[44.15px] translate-y-2">ผลการค้นหาสำหรับ &ldquo;<span className="font-semibold">{keyword}</span>&rdquo;</div>
            ) : (
                <div className="font-semibold text-3xl text-slate-800">เริ่มต้นหางานฟรีแลนซ์ง่าย ๆ กับ<span> </span>
                    <span className="inline-block translate-y-2">
                        <Image
                            src={logoTextBlack}
                            alt="logoTextBlack"
                            // width={16}
                            height={34.75}
                        />
                    </span>
                </div>
            )}
        </>
    )
}