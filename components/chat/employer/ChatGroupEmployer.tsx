"use client"
import ChatCardListEmployer from "./ChatCardListEmployer"
import { EmployerChatListData } from "@/actions/chat/getChatListDataByUser"
import { useState } from "react"
import Image from "next/image"
import downArrowDark from "@/public/icons/downArrowDark.svg";

type Props = {
    studentsInfo: EmployerChatListData
}

export default function ChatGroupEmployer({ studentsInfo }: Props) {
    const [isOpen, setOpen] = useState(false);

    return (
        <div>
            <div
                className="flex flex-row items-center h-[78px] px-[10px] border-b border-slate-300 cursor-pointer"
                onClick={() => setOpen(!isOpen)}
            >
                <Image
                    className={`md:w-[28px] md:h-[28px] transition-transform ${isOpen ? "" : "-rotate-90"} lg:hidden`}
                    src={downArrowDark}
                    alt="arrow"
                    width={24}
                    height={24}
                />
                <Image
                    className={`md:w-[28px] md:h-[28px] transition-transform ${isOpen ? "" : "-rotate-90"} hidden lg:block`}
                    src={downArrowDark}
                    alt="arrow"
                    width={28}
                    height={28}
                />
                <div className="font-bold text-[18px] text-slate-700 ml-[10px] truncate lg:text-[20px]">
                    {studentsInfo.jobTitle}
                </div>

            </div>
            <div
                className={`flex flex-col border-b border-slate-300 pl-[14px] transition-all duration-150 overflow-hidden ${isOpen ? "max-h-100 mb-[20px] opacity-100" : "max-h-0 opacity-0"}`}
            >
                <ChatCardListEmployer students={studentsInfo} />
            </div>
        </div>
    )
}