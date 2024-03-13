export default function AppliedStatus({
  studentId,
  jobId,
}: {
  studentId: string;
  jobId: string;
}) {
  return (
    <div className="w-[330px] flex justify-between mt-[10px] xl:mt-0">
      <button className="h-[35px] bg-[#ef4444] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
        ปฏิเสธ
      </button>
      <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60">
        ยืนยัน
      </button>
    </div>
  );
}
