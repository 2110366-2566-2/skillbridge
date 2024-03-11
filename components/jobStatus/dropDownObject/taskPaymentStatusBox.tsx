import Image from "next/image"
export default function TaskPaymentStatusBox({
    userId,
    jobId
}: {
    userId: string,
    jobId: string
}) {
    return (
        <div className="absolute bottom-[15px] w-[330px] flex justify-between">
            <button className="h-[35px] bg-[#f8fafc] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60 text-black border border-[#334155] flex justify-center items-center">
                <Image src={'/icons/chat.svg'} alt="chat" width={13} height={13} className="mr-[3px]" />
                <p className="text-[#334155]">
                    แชท
                </p>
            </button>
        </div>
    )
}
