"use client"
import ChatCardListEmployer from "./ChatCardListEmployer"
import { EmployerChatListData } from "@/actions/chat/getChatListDataByUser"
import { useState } from "react"
import Image from "next/image"

type Props = {
    studentsInfo: EmployerChatListData
}

export default function ChatGroupEmployer({ studentsInfo }: Props) {
    const [isOpen, setOpen] = useState(false);
    console.log("Test: ", studentsInfo)

    return (
        <>

        </>
    )
}