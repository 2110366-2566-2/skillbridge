"use client"

import { ChatRoomInfo } from "@/actions/chat/getChatRoomInfo"
import Image from "next/image"
import downArrowDark from "@/public/icons/downArrowDark.svg";
import Link from "next/link";

type Props = {
    isStudent: boolean,
    chatRoomInfo: ChatRoomInfo,
}

export default function ChatRoomHeader({ isStudent, chatRoomInfo }: Props) {
    const title = isStudent ? chatRoomInfo.job.title : `${chatRoomInfo.student.firstname || ""} ${chatRoomInfo.student.middlename || ""} ${chatRoomInfo.student.lastname || ""}`
    const subtitle_1 = isStudent ? `${chatRoomInfo.employer.firstname || ""} ${chatRoomInfo.employer.middlename || ""} ${chatRoomInfo.employer.lastname || ""}` : ""
    const subtitle_2 = isStudent ? `, ${chatRoomInfo.employer.position || ""}${chatRoomInfo.employer.position ? ", " : ""} ${chatRoomInfo.employer.position}` : chatRoomInfo.job.title

    const handleTitleClicked = () => {
        if (isStudent) {
            // TO Nut's page in Sprint 3
            console.log("clicked as student")
        } else {
            // TO Studen profile in Sprint 3
            console.log("clicked as employer")
        }
    }

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
            <div className="flex flex-col justify-between gap-1">
                <div
                    className="font-medium text-[20px] text-slate-800 truncate line-clamp-1 hover:underline"
                    onClick={handleTitleClicked}
                >
                    {title}
                </div>
                <div className="flex flex-row text-[14px] text-slate-800 truncate line-clamp-1">
                    <div className="font-medium">
                        {subtitle_1}
                    </div>
                    <div>
                        {subtitle_2}
                    </div>
                </div>
            </div>
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