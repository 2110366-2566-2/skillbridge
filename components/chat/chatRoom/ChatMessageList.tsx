"use client"

import { getMessageByChatRoom } from "@/actions/chat/getMessageByChatRoom"
import ChatMessage from "./ChatMessage"
import { useRef, useEffect, useState } from "react"
import { Message } from "@/actions/chat/getMessageByChatRoom"

type Props = {
    isStudent: boolean,
    chatroomId: string,
    messageList: Message[]
}

export default function ChatMessageList({ isStudent, chatroomId, messageList }: Props) {
    const [messages, setMessages] = useState<Message[]>(messageList)
    const bottomOfPanelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (bottomOfPanelRef.current) {
            bottomOfPanelRef.current.scrollIntoView({ block: 'end' })
        }
    }, [messages])

    return (
        <>
            {messages.length ? (
                <div className="h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2">
                    <div>
                        {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
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