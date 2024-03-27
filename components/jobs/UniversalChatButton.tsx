import getChatroomId from "@/actions/chat/getChatRoomId";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = { studentId: string; employerId: string; jobId: string };

async function UniversalChatButton({ studentId, employerId, jobId }: Props) {
    const chatroomId = await getChatroomId(studentId, employerId, jobId);
    return (
        <Link
            className="h-[35px] bg-[#f8fafc] text-sm  rounded-md w-[32%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center"
            href={`/chat/${chatroomId}`}
        >
            <Image
                src={"/icons/chat.svg"}
                alt="chat"
                width={13}
                height={13}
                className="mr-[3px]"
            />
            <p className="text-[#334155]">แชท</p>
        </Link>
    );
}

export default UniversalChatButton;
