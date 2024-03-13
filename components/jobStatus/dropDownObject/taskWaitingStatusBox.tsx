export default function TaskWaitingStatusBox({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) {
  return (
    <div className="absolute bottom-[15px] w-[295px] flex justify-between">
      <button className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60">
        สละสิทธิ์
      </button>
    </div>
  );
}
