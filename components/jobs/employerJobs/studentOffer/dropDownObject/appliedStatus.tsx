"use client";

import {
  pendingToAccepted,
  pendingToRejected,
} from "@/actions/jobs/jobCards/employerChangeApplicationState";
import { useRouter } from "next/navigation";

export default function AppliedStatus({
  studentId,
  jobId,
}: {
  studentId: string;
  jobId: string;
}) {
  return (
    <div className="w-[330px] flex justify-between mt-[10px] xl:mt-0">
      <button
        className="h-[35px] bg-red-500 text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
        onClick={async () => {
          await pendingToRejected(studentId, jobId);
          location.reload();
        }}
      >
        ปฏิเสธ
      </button>
      <button
        className="h-[35px] bg-[#334155] text-sm text-white rounded-md w-[48%] hover:opacity-80 active:opacity-60"
        onClick={async () => {
          await pendingToAccepted(studentId, jobId);
          location.reload();
        }}
      >
        ยืนยัน
      </button>
    </div>
  );
}
