import ChatGroupEmployer from "./ChatGroupEmployer"
import { getEmployerChatListData } from "@/actions/chat/getChatListDataByUser"

type Props = {
    employerId: string
}

export default async function ChatGroupListEmployer({ employerId }: Props) {
    const groups = await getEmployerChatListData(employerId)

    return (
        <>
            {groups.map((group, index) => <ChatGroupEmployer key={index} studentsInfo={group} />)}
        </>
    )
}
