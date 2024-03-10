export default function TaskWaitingStatusBox({
    userId,
    jobId
}: {
    userId: string,
    jobId: string
}) {
    return (
        <div className="w-full flex justify-between mt-[10px] py-[5px]">
            <button className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60">
                สละสิทธิ์
            </button>
        </div>
    )
}
