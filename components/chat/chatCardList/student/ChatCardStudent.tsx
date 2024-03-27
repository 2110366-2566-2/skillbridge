"use client"

import { StudentChatListData } from "@/actions/chat/getChatListDataByUser"
import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    employer: StudentChatListData
}

export default function ChatCardStudent({ employer }: Props) {
    const pathName = usePathname();
    const isChatRoom = pathName.endsWith(employer.chatrooms[0].chatroomId)
    const avatar = employer.chatrooms[0].employer.profileImageUrl ? employer.chatrooms[0].employer.profileImageUrl : noavatar;

    const formattedDate = () => {
        let formattedDate = ""
        if (employer.chatrooms[0]?.latestMessage?.createdAt.toLocaleDateString("en-GB")) {
            const oldDate = employer.chatrooms[0]?.latestMessage?.createdAt.toLocaleDateString("en-GB")
            const [d, m, yy] = oldDate.split("/")
            formattedDate = `${parseInt(d)}/${parseInt(m)}/${yy.slice(-2)}`
        }

        return formattedDate
    }

    return (
        <Link
            className={`${isChatRoom ? "bg-neutral-200" : "hover:bg-neutral-100"} flex flex-row items-center h-[90px] px-[16px] py-[21px] rounded-[16px] hover:cursor-pointer lg:h-[94px] lg:py-[20px]`}
            href={`/chat/${employer.chatrooms[0].chatroomId}`}
        >
            <Image
                className="rounded-full mr-4 lg:hidden"
                src={avatar}
                alt="avatar"
                width={48}
                height={48}
            />
            <Image
                className="rounded-full hidden lg:block lg:mr-4"
                src={avatar}
                alt="avatar"
                width={54}
                height={54}
            />
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
                    <div className="font-medium text-[16px] text-slate-800 truncate max-w-[24ch] lg:max-w-[27ch]">
                        {employer.jobTitle}
                    </div>
                    <div className="text-[14px] text-[#838383] lg:text-[16px]">
                        {formattedDate()}
                    </div>
                </div>
                <div className="text-[14px] text-[#838383] w-full truncate max-w-[33ch] lg:text-[16px]">
                    {employer.chatrooms[0]?.latestMessage?.isImage ? `ส่งรูป` : employer.chatrooms[0]?.latestMessage?.content}
                </div>
            </div>
        </Link>

    )
}