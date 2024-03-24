import { getMessageByChatRoom } from "@/actions/chat/getMessageByChatRoom"
import ChatMessage from "./ChatMessage"

type Props = {
    isStudent: boolean,
    chatroomId: string
}

export default async function ChatMessageList({ isStudent, chatroomId }: Props) {
    const messages = await getMessageByChatRoom(chatroomId)

    return (
        <div className="h-full w-full px-3 pb-[6px] overflow-y-auto pt-4 lg:px-3 lg:pb-2">
            {messages.map((message, index) => <ChatMessage key={index} message={message} />)}
        </div>
    )
}