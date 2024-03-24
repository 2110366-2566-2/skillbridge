import Link from "next/link";

export default function PayButton({
  studentId,
  jobId,
}: {
  studentId: string;
  jobId: string;
}) {
  return (
    <div className="flex justify-end">
      <div className="w-1/2 flex justify-end mt-[10px] xl:mt-0">
        <Link href={`/jobs/${jobId}/payment/${studentId}`} 
          className="h-[35px] w-[48%]" >
          <button
            className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60"
          >
            จ่ายเงิน
          </button>

        </Link>
      </div>
    </div>
  );
}
