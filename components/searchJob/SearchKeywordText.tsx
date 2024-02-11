"use client"

import { useState } from "react"

export default function SearchKeywordText() {
    const [keyword, setKeyword] = useState("")

    return (
        <>
            {keyword ? (
                <div className="text-3xl text-slate-800">ผลการค้นหาสำหรับ "<span className="font-semibold">{keyword}</span>"</div>
            ) : (
                <div className="font-semibold text-3xl text-slate-800">เริ่มต้นหางานฟรีแลนซ์ง่าย ๆ กับ SkillBridge</div>
            )}
        </>
    )
}