import Image from "next/image"
export default function TaskInProgressStatusBox({
    userId,
    jobId
}: {
    userId: string,
    jobId: string
}) {
    return (
        <div className="w-full flex justify-between mt-[10px] py-[5px]">
            <button className="h-[35px] bg-[#f8fafc] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center">
                <Image src={'/icons/chat.svg'} alt="chat" width={13} height={13} className="mr-[3px]" />
                แชท
            </button>
            <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
                ส่งมอบงาน
            </button>
        </div>
    )
}
