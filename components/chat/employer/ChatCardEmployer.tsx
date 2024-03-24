"use client"

import { EmployerChatListData } from "@/actions/chat/getChatListDataByUser"
import Image from "next/image"
import noavatar from "@/public/icons/noavatar.svg";
import { Message } from "@/actions/chat/getMessageByChatRoom";

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
    const avatar = noavatar;
    console.log(chatroom)

    return (
        <div className="flex flex-row items-center h-[90px] px-[16px] py-[21px] rounded-[16px] hover:bg-neutral-200 hover:cursor-pointer lg:h-[94px] lg:py-[20px]">
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
                    <div className="font-medium text-[16px] text-slate-800 truncate max-w-[20ch]">
                        {chatroom.student.firstname} {chatroom.student.middlename} {chatroom.student.lastname}
                    </div>
                    <div className="text-[14px] text-[#838383] lg:text-[16px]">
                        {chatroom.latestMessage?.createdAt.toLocaleDateString("en-GB")}
                    </div>
                </div>
                <div className="text-[14px] text-[#838383] w-full truncate max-w-[33ch] lg:text-[16px]">
                    {chatroom.latestMessage?.content}
                </div>
            </div>
        </div>

    )
}