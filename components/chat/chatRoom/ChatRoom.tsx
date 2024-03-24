import ChatRoomHeader from "./ChatRoomHeader"
import ChatMessageList from "./ChatMessageList"
import ChatInput from "./ChatInput"

type Props = {
    isStudent: boolean,
    chatroomId: string,
}

export default function ChatRoom({ isStudent, chatroomId }: Props) {
    return (
        <div className="h-[100dvh] w-full flex flex-col bg-neutral-100 border border-[#CBD5E1] lg:h-[80vh]">
            <ChatRoomHeader isStudent={isStudent} chatroomId={chatroomId} />
            <ChatMessageList isStudent={isStudent} chatroomId={chatroomId} />
            <ChatInput isStudent={isStudent} chatroomId={chatroomId} />
        </div>
    )
}