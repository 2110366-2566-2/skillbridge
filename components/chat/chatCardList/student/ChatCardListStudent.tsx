import ChatCardStudent from "./ChatCardStudent"
import { getStudentChatListData } from "@/actions/chat/getChatListDataByUser"

type Props = {
    studentId: string
}

export default async function ChatCardListStudent({ studentId }: Props) {
    const employers = await getStudentChatListData(studentId)

    return (
        <>
            {employers.map((employer, index) => <ChatCardStudent key={index} employer={employer} />)}
        </>
    )
}