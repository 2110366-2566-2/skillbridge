export default function TaskFailStatusBox({
    userId,
    jobId
}: {
    userId: string,
    jobId: string
}) {
    return (
        <div className="w-full flex justify-between mt-[10px] py-[5px]">
            <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60">
                ปิด
            </button>
        </div>
    )
}
