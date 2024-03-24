"use client"

type Props = {
    isStudent: boolean,
    chatroomId: string,
}

export default function ChatRoomHeader({ isStudent, chatroomId }: Props) {

    return (
        <div className="h-[90px] w-full flex flex-row bg-slate-50 border-b border-[#CBD5E1] lg:h-[94px]">
            รอนอร์ท
        </div>
    )
}