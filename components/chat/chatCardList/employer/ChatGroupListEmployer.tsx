"use client"

import { useAppSelector } from "@/redux/store";
import ChatGroupEmployer from "./ChatGroupEmployer"
import { useEffect, useState } from "react"
import { EmployerChatListData, getEmployerChatListData } from "@/actions/chat/getChatListDataByUser"
import ChatGroupEmployerLoading from "./ChatGroupEmployerLoading";
import SearchNotFound from "@/components/searchJob/SearchNotFound";

type Props = {
    employerId: string
}

export default function ChatGroupListEmployer({ employerId }: Props) {
    const [groups, setGroups] = useState<EmployerChatListData[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const chatListReloadState = useAppSelector((state) => state.chatList.chatListReloadState);

    useEffect(() => {
        async function getChatList() {
            try {
                setGroups(await getEmployerChatListData(employerId));
            } catch (err) {
                console.log("Error setGroups: ", err)
                return;
            } finally {
                setLoading(false)
            }
        }

        getChatList();
        console.log("New state: ", chatListReloadState)

    }, [chatListReloadState])

    return (
        <>
            {loading ? (
                Array.from({ length: 12 }).map((_, index) => (
                    <ChatGroupEmployerLoading key={index} />
                ))
            ) : groups.length ? (
                groups.map((group, index) => <ChatGroupEmployer key={index} studentsInfo={group} />)
            ) : (
                <div className="col-span-full">
                    <SearchNotFound text="ไม่พบห้องแชท" />
                </div>
            )}
        </>
    )
}

