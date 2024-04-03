"use client"

import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg";
import { Message } from "@/actions/chat/getMessageByChatRoom";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
    chatroom: {
        chatroomId: string;
        latestMessage: Message | null;
        student: {
            profileImageUrl: string | null;
            studentId: string;
            salutation: string;
            firstname: string;
            middlename: string | null;
            lastname: string;
        };
    }
}

export default function ChatCardEmployer({ chatroom }: Props) {
    const pathName = usePathname();
    const isChatRoom = pathName.endsWith(chatroom.chatroomId)
    const avatar = chatroom.student.profileImageUrl ? chatroom.student.profileImageUrl : noavatar;

    const formattedDate = () => {
        let formattedDate = ""
        if (chatroom.latestMessage?.createdAt.toLocaleDateString("en-GB")) {
            const oldDate = chatroom.latestMessage?.createdAt.toLocaleDateString("en-GB")
            const [d, m, yy] = oldDate.split("/")
            formattedDate = `${parseInt(d)}/${parseInt(m)}/${yy.slice(-2)}`
        }

        return formattedDate
    }

    return (
        <Link
            className={`${isChatRoom ? "bg-neutral-200" : "hover:bg-neutral-100"} flex flex-row items-center h-[90px] px-[16px] py-[21px] rounded-[16px] hover:cursor-pointer lg:h-[94px] lg:py-[20px]`}
            href={`/chat/${chatroom.chatroomId}`}
        >
            <Image
                className="w-[48px] h-[48px] rounded-full mr-4 lg:hidden"
                src={avatar}
                alt="avatar"
                width={48}
                height={48}
                style={{
                    objectFit: 'cover',
                }}
            />
            <Image
                className="w-[54px] h-[54px] rounded-full hidden lg:block lg:mr-4"
                src={avatar}
                alt="avatar"
                width={54}
                height={54}
                style={{
                    objectFit: 'cover',
                }}
            />
            <div className="flex flex-col w-full gap-1">
                <div className="flex flex-row justify-between w-full items-center lg:text-[18px]">
                    <div className="font-medium text-[16px] text-slate-800 truncate max-w-[22ch] lg:max-w-[25ch]">
                        {chatroom.student.firstname} {chatroom.student.middlename} {chatroom.student.lastname}
                    </div>
                    <div className="text-[14px] text-[#838383] lg:text-[16px]">
                        {formattedDate()}
                    </div>
                </div>
                <div className="text-[14px] text-[#838383] w-full truncate max-w-[31ch] lg:text-[16px]">
                    {chatroom.latestMessage?.isImage ? "ส่งรูป" : chatroom.latestMessage?.content}
                </div>
            </div>
        </Link>

    )
}