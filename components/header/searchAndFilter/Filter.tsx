"use client"

import { ChangeEvent, useState } from "react";
import Image from "next/image";

const filterIcon = require("@/public/icons/filter.svg") as string;
const filterDarkIcon = require("@/public/icons/filterDark.svg") as string;
const closeDarkIcon = require("@/public/icons/closeDark.svg") as string;

export default function Filter() {
    const [isOpen, setIsOpen] = useState(false);
    const [filtered, setFiltered] = useState({
        startDate: "",
        endDate: "",
        jobTags: "",
        minPrice: 0,
        maxPrice: 0
    })
    const jobList = [
        "กราฟิกดีไซน์",
        "สถาปัตย์",
        "ตกแต่งภายใน",
        "ศิลปะและภาพวาด",
        "ออกแบบ UX UI",
        "พัฒนาแอพฯมือถือ",
        "พัฒนาเว็ปไซต์",
        "ไอทีโซลูชั่น",
        "งาน IOT",
        "อินฟลูเอนเซอร์",
        "สื่อออนไลน์",
        "แอดมินออนไลน์",
        "ไลฟ์สไตล์",
        "พัฒนาตัวเอง",
        "ธุรกิจและการเงิน",
        "รูปภาพและวีดีโอ",
        "แต่งหน้า",
        "สไตลิสต์",
        "นักแสดง",
        "นักพากย์เสียง",
        "นักร้อง / นักดนตรี",
        "ซาวด์เอ็นจิเนียร์",
        "งานเขียน",
        "ภาษา",
        "อื่น ๆ",
    ]

    const toggleOpen = () => {
        if (isOpen) {
            clearInput()
        }
        setIsOpen(prev => !prev)
    }

    const clearInput = () => {
        setFiltered({
            startDate: "",
            endDate: "",
            jobTags: "",
            minPrice: 0,
            maxPrice: 0
        })
    }

    const handleChange = (evt: ChangeEvent) => {
        const changedInput = evt.target as HTMLInputElement; // Type assertion to HTMLInputElement
        const changedField = changedInput.name;
        const newValue = changedInput.value;

        setFiltered((currData) => ({
            ...currData,
            [changedField]: newValue,
        }));
        console.log(changedField, newValue)
    };
    return (
        <>
            {/* Mobile Button*/}
            <div
                className="md:hidden"
                onClick={() => setIsOpen(true)}
            >
                <Image
                    src={filterIcon}
                    alt="filterIcon"
                    width={24}
                    height={24}
                />
            </div>

            {/* Tablet and Desktop Button */}
            <div
                className="hidden md:flex md:flex-row md:items-center md:justify-center md:min-w-[99px] md:min-h-[40px] md:bg-slate-300 md:rounded-[6px] lg:min-w-[109px] lg:min-h-[48px]"
                onClick={toggleOpen}
            >
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

            {/* Mobile and Desktop Filter Form */}
            {isOpen && (
                <div>
                    {/* Shadow Background When Open */}
                    <div className="fixed inset-0 overflow-hidden z-40 bg-neutral-800 opacity-60"></div>
                    {/* Filter Form */}
                    <div className="fixed inset-0 overflow-hidden font-ibm z-50 bg-slate-50 w-2/3 h-screen flex flex-col p-7 justify-between md:hidden">
                        <div className="flex flex-col">
                            <div
                                className="self-end rounded-[50%] p-1 hover:bg-slate-100"
                                onClick={toggleOpen}
                            >
                                <Image
                                    src={closeDarkIcon}
                                    alt="closeDarkIcon"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            {/* Topic */}
                            <div className="font-bold text-[24px] text-slate-800 mt-4 mb-6">จัดการตัวกรอง</div>
                            {/* Date Range */}
                            <div className="font-bold text-[20px] text-slate-800 mb-2">ช่วงเวลา</div>
                            <div className="font-medium text-[16px] text-slate-800 mb-1">วันเริ่มต้น</div>
                            <div>
                                <input
                                    type="date"
                                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
                                    placeholder="วว/ดด/ปปปป"
                                    name="startDate"
                                    value={filtered.startDate}
                                    onChange={handleChange}
                                ></input>
                            </div>
                            <div className="font-medium text-[16px] text-slate-800 mt-3 mb-1">วันสิ้นสุด</div>
                            <div>
                                <input
                                    type="date"
                                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
                                    placeholder="วว/ดด/ปปปป"
                                    name="endDate"
                                    value={filtered.endDate}
                                    onChange={handleChange}
                                />
                            </div>
                            {/* Price Range */}
                            <div className="font-bold text-[20px] text-slate-800 mt-6 mb-2">ช่วงราคา</div>
                            <div className="font-medium text-[16px] text-slate-800 mb-1">ราคาต่ำสุด</div>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
                                    placeholder="0"
                                    name="minPrice"
                                    value={filtered.minPrice === 0 ? "" : filtered.minPrice}
                                    onChange={handleChange}
                                />
                                <div className="absolute text-slate-400 inset-y-0 end-3 flex items-center pointer-events-none">
                                    บาท
                                </div>
                            </div>
                            <div className="font-medium text-[16px] text-slate-800 mt-3 mb-1">ราคาสูงสุด</div>
                            <div className="relative">
                                <input
                                    type="number"
                                    className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-2"
                                    placeholder="ราคาสูงสุด"
                                    name="maxPrice"
                                    value={filtered.maxPrice === 0 ? "" : filtered.maxPrice}
                                    onChange={handleChange}
                                />
                                <div className="absolute text-slate-400 inset-y-0 end-3 flex items-center pointer-events-none">
                                    บาท
                                </div>
                            </div>
                            {/* Job Tag */}
                            <div className="font-bold text-[20px] text-slate-800 mt-6 mb-2">หมวดหมู่</div>
                            <select
                                id="jobTags"
                                className="bg-slate-50 border border-slate-300 text-slate-800 text-[16px] rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 block w-full p-[5.75px]" name="jobTags"
                                value={filtered.jobTags}
                                onChange={handleChange}
                            >
                                <option value="">เลือกหมวดหมู่ที่ต้องการ</option>
                                {jobList.map(job => (
                                    <option key={job} value={job}>{job}</option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-row justify-between gap-2">
                            <button
                                type="button"
                                className="w-1/2 min-h-[40px] text-slate-700 text-[16px] rounded-md hover:bg-slate-200 focus:ring-4 focus:outline-none focus:ring-slate-300"
                                onClick={clearInput}
                            >
                                ล้าง
                            </button>
                            <button
                                type="button"
                                className="w-1/2 min-h-[40px] text-white text-[16px] rounded-md bg-slate-700 hover:bg-slate-600 focus:ring-4 focus:outline-none focus:ring-slate-300"
                                onClick={toggleOpen} // TODO: Fix to send filtered date
                            >
                                ยืนยัน
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Filter Form */}
            {/* TODO: Implement in Mobile size loey */}
            {/* {isOpen && (
                <div className="hidden md:fixed md:inset-0 md:overflow-hidden md:font-ibm md:z-50 md:bg-slate-50 md:w-[28%] md:h-screen md:flex md:flex-col md:p-12 md:justify-between">
                    <div className="flex flex-row justify-between items-center">
                        <div className="font-bold text-[30px] text-slate-800">จัดการตัวกรอง</div>
                        <div
                            className="rounded-[50%] p-2 hover:bg-slate-100"
                            onClick={toggleOpen}
                        >
                            <Image
                                src={closeDarkIcon}
                                alt="closeDarkIcon"
                                width={30}
                                height={30}
                            />
                        </div>
                    </div>

                </div>
            )} */}
        </>
    )
}