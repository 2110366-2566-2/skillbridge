export default function TaskPassStatusBox({
    userId,
    jobId
}: {
    userId: string,
    jobId: string
}) {
    return (
        <div className="absolute bottom-[15px] w-[330px] flex justify-between">
            <button className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
                ปฏิเสธ
            </button>
            <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
                ยืนยัน
            </button>
        </div>
    )
}
