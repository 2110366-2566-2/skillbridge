"use client"

import ChatCardStudent from "./ChatCardStudent"
import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useEffect, useState } from "react"
import { StudentChatListData } from "@/actions/chat/getChatListDataByUser"
import { useAppSelector } from "@/redux/store"

type Props = {
    studentId: string
}

export default function ChatCardListStudent({ studentId }: Props) {
    const [employers, setEmployers] = useState<StudentChatListData[]>([])
    const chatListReloadState = useAppSelector((state) => state.chatList.chatListReloadState);
    // const employers = await getStudentChatListData(studentId)
    // console.log("Initial state: ", chatListReloadState)
    useEffect(() => {
        async function getChatList() {
            try {
                setEmployers(await getStudentChatListData(studentId));
            } catch (err) {
                console.log("Error setEmployer: ", err)
                return;
            }
        }

        getChatList();
        console.log("New state: ", chatListReloadState)

    }, [chatListReloadState])

    return (
        <>
            {employers.length ? (
                employers.map((employer, index) => <ChatCardStudent key={index} employer={employer} />)
            ) : (
                <div>กำลังดาวน์โหลด</div>
            )}
        </>
    )
}