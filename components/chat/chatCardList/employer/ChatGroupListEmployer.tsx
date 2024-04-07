"use client"

import { useAppSelector } from "@/redux/store";
import ChatGroupEmployer from "./ChatGroupEmployer"
import { useEffect, useState } from "react"
import { EmployerChatListData, getEmployerChatListData } from "@/actions/chat/getChatListDataByUser"

type Props = {
    employerId: string
}

export default function ChatGroupListEmployer({ employerId }: Props) {
    const [groups, setGroups] = useState<EmployerChatListData[]>([])
    const chatListReloadState = useAppSelector((state) => state.chatList.chatListReloadState);

    useEffect(() => {
        async function getChatList() {
            try {
                setGroups(await getEmployerChatListData(employerId));
            } catch (err) {
                console.log("Error setGroups: ", err)
                return;
            }
        }

        getChatList();
        console.log("New state: ", chatListReloadState)

    }, [chatListReloadState])

    return (
        <>
            {groups.length ? (
                groups.map((group, index) => <ChatGroupEmployer key={index} studentsInfo={group} />)
            ) : (
                <div>กำลังดาวน์โหลด</div>
            )}
        </>
    )
}

