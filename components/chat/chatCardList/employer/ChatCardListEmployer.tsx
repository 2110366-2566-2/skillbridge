import ChatCardEmployer from "./ChatCardEmployer"
import { EmployerChatListData } from "@/actions/chat/getChatListDataByUser"

type Props = {
    students: EmployerChatListData
}

export default function ChatCardListEmployer({ students }: Props) {

    return (
        <>
            {students.chatrooms.map((chatroom, index) => <ChatCardEmployer key={index} chatroom={chatroom} />)}
        </>
    )
}