"use client"

import ChatMessageListByDate from "./ChatMessageListByDate"
import { useRef, useEffect, useState } from "react"
import { MessagesGroupByDate } from "@/actions/chat/getMessageByChatRoom"

type Props = {
    isStudent: boolean,
    chatroomId: string,
    messagesGroupByDate: MessagesGroupByDate[],
    senderId: string
}

export default function ChatMessageList({ isStudent, chatroomId, messagesGroupByDate, senderId }: Props) {
    const [messagesByDate, setMessagesByDate] = useState<MessagesGroupByDate[]>(messagesGroupByDate)
    const bottomOfPanelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (bottomOfPanelRef.current) {
            bottomOfPanelRef.current.scrollIntoView({ block: 'end' })
        }
    }, [messagesByDate])

    return (
        <>
            {messagesByDate.length ? (
                <div className="h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2">
                    <div className="flex flex-col-reverse">
                        {messagesByDate.slice().reverse().map((messageByDate, index) => <ChatMessageListByDate key={index} messageByDate={messageByDate} senderId={senderId} />)}
                    </div>
                    <div ref={bottomOfPanelRef}></div>
                </div>
            ) : (
                <div className="flex flex-col items-center justify-end text-slate-400 text-[14px] h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2 lg:text-[16px]">
                    เริ่มต้นการแชทกับคนคนนี้!
                </div>
            )}
        </>
    )
}