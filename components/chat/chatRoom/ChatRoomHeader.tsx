"use client"

import { ChatRoomInfo } from "@/actions/chat/getChatRoomInfo"
import Image from "next/image"
import downArrowDark from "@/public/icons/downArrowDark.svg";
import Link from "next/link";

type Props = {
    isStudent: boolean,
    chatRoomInfo: ChatRoomInfo | undefined,
}

export default function ChatRoomHeader({ isStudent, chatRoomInfo }: Props) {
    const title = isStudent ? chatRoomInfo?.job?.title : `${chatRoomInfo?.student?.firstname || ""} ${chatRoomInfo?.student?.middlename || ""} ${chatRoomInfo?.student?.lastname || ""}`
    const subtitle_1 = isStudent ? `${chatRoomInfo?.employer?.firstname || ""} ${chatRoomInfo?.employer?.middlename || ""} ${chatRoomInfo?.employer?.lastname || ""}` : ""
    const subtitle_2 = isStudent ? `${chatRoomInfo?.employer?.position ? ", " : ""}${chatRoomInfo?.employer?.position || ""}${chatRoomInfo?.employer?.organization ? ", " : ""} ${chatRoomInfo?.employer?.organization}` : chatRoomInfo?.job?.title

    return (
        <div className="h-[90px] w-full flex flex-row items-center bg-slate-50 border-b border-[#CBD5E1] px-3 lg:h-[94px]">
            <Link
                className="mr-3 lg:hidden"
                href={"/chat"}
            >
                <Image
                    className={`rotate-90`}
                    src={downArrowDark}
                    alt="arrow"
                    width={24}
                    height={24}
                />
            </Link>
            {chatRoomInfo ? (
                <div className="flex flex-col justify-between gap-1">
                    <Link
                        className="font-medium text-[20px] text-slate-800 truncate-[30ch] line-clamp-1 cursor-pointer hover:underline"
                        href={isStudent ? "/" : "/"} // TO Nut's page in Sprint 3 : TO Student profile in Sprint 3
                    >
                        {title}
                    </Link>
                    <div className="flex flex-row text-[14px] text-slate-800 truncate line-clamp-1">
                        <div className="font-medium">
                            {subtitle_1}
                        </div>
                        <div>
                            {subtitle_2}
                        </div>
                    </div>
                </div>
            ) : (
                <div>กำลังดาวน์โหลด...</div>
            )}

        </div>
    )
}

// export interface ChatRoomInfo {
//     student: {
//       id: string;
//       salutation: string;
//       firstname: string;
//       middlename: string | null;
//       lastname: string;
//     };
//     employer: {
//       id: string;
//       salutation: string;
//       firstname: string;
//       middlename: string | null;
//       lastname: string;
//       position: string;
//       organization: string;
//     };
//     job: {
//       id: string;
//       title: string;
//     };
//   };