"use client"

import { Message } from "@/actions/chat/getMessageByChatRoom"
import { useSession } from "next-auth/react"
import Image from "next/image"

type Props = {
    message: Message,
}

export default function ChatMessage({ message }: Props) {
    const { id, userId, createdAt, content, isImage } = message
    const { data: session } = useSession();
    // const isSender = session?.user.id === userId
    // console.log(session)
    const isSender = true // Hard code
    const hours = createdAt.getHours().toString().padStart(2, "0")
    const minutes = createdAt.getMinutes().toString().padStart(2, "0");
    const time = `${hours}:${minutes}`

    return (
        <>
            {isImage ? (
                // Case: IMAGE  
                <div className={`flex flex-col ${isSender ? "items-end" : ""}`}>
                    <div className={`flex flex-row gap-2 items-end `}>
                        {isSender && <div className={`text-slate-500 text-[12px] -translate-y-[6px] lg:text-[12px]`}>{time}</div>}
                        <Image
                            className={`mb-2 rounded-[16px] max-w-[64vw] shadow lg:max-w-[24vw]`}
                            src={content.data}
                            alt="chatImage"
                            width={268}
                            height={357}
                        />
                        {!isSender && <div className="text-slate-500 text-[12px] -translate-y-[6px] lg:text-[12px]">{time}</div>}
                    </div>
                </div>
            ) : (
                // Case: TEXT
                <div className={`flex flex-col ${isSender ? "items-end" : ""}`}>
                    <div className={`flex flex-row gap-2 items-end `}>
                        {isSender && <div className={`text-slate-500 text-[12px] -translate-y-[6px] lg:text-[12px]`}>{time}</div>}
                        <div className={`${isSender ? "bg-emerald-200" : "bg-slate-200"} text-slate-900 px-[10px] pt-[8px] pb-[4px] mb-2 rounded-[16px] max-w-[64vw] shadow lg:px-[12px] lg:max-w-[24vw]`}>
                            {content}
                        </div>
                        {!isSender && <div className="text-slate-500 text-[12px] -translate-y-[6px] lg:text-[12px]">{time}</div>}
                    </div>
                </div>

            )
            }
        </>
    )
}

// [
// {
//     id: 'd72bd0d2-df6a-4083-acf1-baa52c89b768',
//     userId: 'f587e9c0-1e66-4f08-b72b-a07b4fe0ec6f',
//     createdAt: 2024-03-24T13:14:15.582Z,
//     content: 'หวัดดี​ฮาฟฟู่ว',
//     isImage: false
//   },
//   {
//     id: '5b8d79bd-df0c-4e2d-aafd-8d7880d08e28',
//     userId: 'f587e9c0-1e66-4f08-b72b-a07b4fe0ec6f',
//     createdAt: 2024-03-24T13:30:00.199Z,
//     content: {
//       success: true,
//       data: 'https://skillbridge-s3.s3.us-east-1.amazonaws.com/imageMessageFiles/93c68ae8f5db5e7818d1157d4e7e06c574c9cd22db28e562df050c0340d887be?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAVRUVUMB3ZFAZRNTX%2F20240324%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240324T200954Z&X-Amz-Expires=3600&X-Amz-Signature=bf0f57d1dd8698d817c567e2d6fde01ddd9edf72370c319de5aff01e75f74fed&X-Amz-SignedHeaders=host&x-id=GetObject'
//     },
//     isImage: true
//   }
// ]