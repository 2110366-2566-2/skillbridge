import {
    deliveredToInProgress,
    deliveredToWagePaymentPending,
} from "@/actions/jobs/jobCards/employerChangeApplicationState";
import Image from "next/image";
import ProgressButton from "../ProgressButton";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import getChatroomId from "@/actions/chat/getChatRoomId";

export default function ApproveButton({
    studentId,
    jobId,
}: {
    studentId: string;
    jobId: string;
}) {
    const [chatroomId, setChatroomId] = useState<string>("");
    const employerId = useSession().data?.user?.id ?? "";

    useEffect(() => {
        const getChatroom= async () => {
            const chatroom = await getChatroomId(studentId, employerId, jobId);
            setChatroomId(chatroom);
        };
        getChatroom();
    }, []);
    return (
        <div className="flex flex-row justify-between">
            <ProgressButton jobId={jobId} studentId={studentId} />
            <div className="w-1/2 flex justify-between">
                <button
                    className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[32%] hover:opacity-80 active:opacity-60"
                    onClick={async () => {
                        await deliveredToInProgress(studentId, jobId);
                        location.reload();
                    }}
                >
                    ไม่รับมอบงาน
                </button>
                <button
                    className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[32%] hover:opacity-80 active:opacity-60"
                    onClick={async () => {
                        await deliveredToWagePaymentPending(studentId, jobId);
                        location.reload();
                    }}
                >
                    รับมอบงาน
                </button>
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
            </div>
        </div>
    );
}

