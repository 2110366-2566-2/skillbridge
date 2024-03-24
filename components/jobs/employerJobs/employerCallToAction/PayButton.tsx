import Link from "next/link";

export default function PayButton({
  studentId,
  jobId,
}: {
  studentId: string;
  jobId: string;
}) {
  return (
      <div className="flex flex-row justify-between">
          <Link
              href={`jobs/${jobId}/progress/${studentId}`}
              className="flex justify-center items-center h-[35px] w-[24%] bg-slate-50 text-sm text-slate-900 border border-slate-700 rounded-md hover:shadow-md hover:border-slate-800 active:border-slate-900 transition duration-200 ease-in-out"
          >
              ความคืบหน้า
          </Link>
          <div className="w-1/2 flex justify-end">
              <Link
                  href={`/jobs/${jobId}/payment/${studentId}`}
                  className="h-[35px] w-[48%]"
              >
                  <button className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[100%] hover:opacity-80 active:opacity-60">
                      จ่ายเงิน
                  </button>
              </Link>
          </div>
      </div>
  );
}
