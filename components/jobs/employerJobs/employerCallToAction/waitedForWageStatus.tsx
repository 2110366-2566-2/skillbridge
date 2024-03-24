export default function WaitedForWageStatus({
  studentId,
  jobId,
}: {
  studentId: string;
  jobId: string;
}) {
  return (
    <div className="w-[330px] flex justify-between mt-[10px] xl:mt-0">
      <button
        className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60"
        onClick={() => {
          /* go call little's function to pay remaining wage*/
        }}
      >
        จ่ายเงิน
      </button>
    </div>
  );
}