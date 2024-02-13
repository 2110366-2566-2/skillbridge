"use client"

import { useState, useEffect } from "react"
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const logoTextBlack = require("@/public/logos/logo-text-black.svg") as string;

export default function SearchKeywordText() {
    const searchParams = useSearchParams();
    const queryString = searchParams.get("q");
    const [keyword, setKeyword] = useState(queryString)

    useEffect(() => {
        async function setSearchKeyword() {
            try {
                const q = searchParams.get("q");
                if (q !== null) setKeyword(q);
            } catch (error) {
                console.error("Error set SearchKeyword:", error);
            }
        }

        setSearchKeyword();
    }, [searchParams]);

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
                            priority={true}
                        />
                    </span>
                </div>
            )}
        </>
    )
}