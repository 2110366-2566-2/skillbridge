"use client"
import ChatRoomHeader from "./ChatRoomHeader"
import ChatMessageList from "./ChatMessageList"
import ChatInput from "./ChatInput"
import { ChatRoomInfo, getChatRoomInfo } from "@/actions/chat/getChatRoomInfo"
import { useEffect, useState } from "react"
import { connect } from "../clientSocket/clientSocket";

type Props = {
    isStudent: boolean,
    chatroomId: string,
    senderId: string
}

export default function ChatRoom({ isStudent, chatroomId, senderId }: Props) {
    const [chatRoomInfo, setChatRoomInfo] = useState<ChatRoomInfo>();

    useEffect(() => {
        async function getInitialData() {
            try {
                setChatRoomInfo(await getChatRoomInfo(chatroomId));
            } catch (err) {
                console.log(err)
                return;
            }
        }

        getInitialData();

    }, [])
    
    // connect to websocket with specific chatroomId and senderId
    // put it here to make sure that setIncommingMessageHandler is called after socket connection is called
    // put it here because useEffect triggers in child components before parent component
    connect(chatroomId, senderId);

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-neutral-100 border border-[#CBD5E1] lg:h-[80vh]">
            <ChatRoomHeader isStudent={isStudent} chatRoomInfo={chatRoomInfo} />
            <ChatMessageList isStudent={isStudent} chatroomId={chatroomId} senderId={senderId} />
            <ChatInput isStudent={isStudent} chatroomId={chatroomId} />
        </div>
    )
}