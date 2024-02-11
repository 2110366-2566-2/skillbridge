"use client"

import { useState } from "react"

export default function SearchKeywordText() {
    const [keyword, setKeyword] = useState("")

    return (
        <div className={`${keyword ? "" : "font-semibold"} text-3xl text-slate-800`}>{keyword ? `ผลการค้นหาสำหรับ "` : "เริ่มหางานฟรีแลนซ์ง่าย ๆ กับ SkillBridge"}<span className="font-semibold">{keyword}</span>{keyword ? `"` : ""}</div>
    )
}