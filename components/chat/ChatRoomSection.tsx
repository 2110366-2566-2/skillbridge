"use client"

import ReduxProvider from "@/redux/redux-provider";
import ChatRoom from "./chatRoom/ChatRoom";

type Props = {
    isStudent: boolean,
    chatroomId: string,
    senderId: string
}

export default function ChatRoomSection({ isStudent, chatroomId, senderId }: Props) {

    return (
        <ReduxProvider>
            <ChatRoom isStudent={isStudent} chatroomId={chatroomId} senderId={senderId} />
        </ReduxProvider>
    )
}