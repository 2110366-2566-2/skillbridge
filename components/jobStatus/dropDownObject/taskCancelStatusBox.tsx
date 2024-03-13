

export default function TaskCancelStatusBox({
    userId,
    jobId
}: {
    userId: string,
    jobId: string
}) {
    return (
        <div className="absolute bottom-[15px] w-[295px] flex justify-between">
            <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60">
                ปิด
            </button>
        </div>
    )
}
