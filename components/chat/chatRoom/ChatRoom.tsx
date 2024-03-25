import ChatRoomHeader from "./ChatRoomHeader"
import ChatMessageList from "./ChatMessageList"
import ChatInput from "./ChatInput"
import { getChatRoomInfo } from "@/actions/chat/getChatRoomInfo"
import { getMessageByChatRoom } from "@/actions/chat/getMessageByChatRoom"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/auth"

type Props = {
    isStudent: boolean,
    chatroomId: string,
}

export default async function ChatRoom({ isStudent, chatroomId }: Props) {
    const session = await getServerSession(authOptions)
    const chatRoomInfo = await getChatRoomInfo(chatroomId)
    const messageList = await getMessageByChatRoom(chatroomId)
    const senderId = session?.user.id

    return (
        <div className="h-[100dvh] w-full flex flex-col bg-neutral-100 border border-[#CBD5E1] lg:h-[80vh]">
            <ChatRoomHeader isStudent={isStudent} chatRoomInfo={chatRoomInfo} />
            <ChatMessageList isStudent={isStudent} chatroomId={chatroomId} messageList={messageList} senderId={senderId} />
            <ChatInput isStudent={isStudent} chatroomId={chatroomId} />
        </div>
    )
}