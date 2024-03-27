import getChatroomId from "@/actions/chat/getChatRoomId";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getUserId from "@/actions/authentication/getUserId";

type Props = {
    studentId?: string;
    employerId?: string;
    jobId: string;
    className?: string;
};

function ChatLink({
    studentId = "",
    employerId = "",
    jobId,
    className = "",
}: Props) {
    const [chatroomId, setChatroomId] = useState<string>("");
    
    useEffect(() => {
        if (studentId === "") {
            const getChatroom = async () => {
                const userId = await getUserId();
                const chatroom = await getChatroomId(userId, employerId, jobId);
                setChatroomId(chatroom);
            };
            getChatroom();
        } else if (employerId === "") {
            const getChatroom = async () => {
                const userId = await getUserId();
                const chatroom = await getChatroomId(studentId, userId, jobId);
                setChatroomId(chatroom);
            };
            getChatroom();
        }
    }, [employerId, jobId, studentId]);

    return (
        <Link className={className} href={`/chat/${chatroomId}`}>
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

export default ChatLink;
